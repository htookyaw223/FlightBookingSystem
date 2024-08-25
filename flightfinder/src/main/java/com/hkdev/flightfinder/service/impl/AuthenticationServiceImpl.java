package com.hkdev.flightfinder.service.impl;

import com.hkdev.flightfinder.constants.UserRole;
import com.hkdev.flightfinder.dto.request.LoginReqDto;
import com.hkdev.flightfinder.dto.request.UserRequestDto;
import com.hkdev.flightfinder.dto.response.LoginResDto;
import com.hkdev.flightfinder.dto.response.UserResponseDto;
import com.hkdev.flightfinder.entity.User;
import com.hkdev.flightfinder.exception.CustomErrorException;
import com.hkdev.flightfinder.exception.ServerErrorException;
import com.hkdev.flightfinder.repository.UserRepo;
import com.hkdev.flightfinder.security.service.CustomUserDetails;
import com.hkdev.flightfinder.security.service.JwtService;
import com.hkdev.flightfinder.service.AuthenticationService;
import com.hkdev.flightfinder.service.UserService;
import com.hkdev.flightfinder.validations.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    UserService userDetailsService;
    @Autowired
    private UserRepo authenticationRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @Override
    public User findByUserName(String username) {
        return authenticationRepo.findByUsername(username).get();
    }


    @Override
    public UserResponseDto signUp(UserRequestDto userRequestDto) {
        log.info("hello {}", userRequestDto);
        if (!userRequestDto.getPassword().equals(userRequestDto.getConfirmPassword())) {
            throw new CustomErrorException("Passwords do not match ", HttpStatus.BAD_REQUEST);
        }
        User user = new User(userRequestDto.getEmail(), passwordEncoder.encode(userRequestDto.getPassword()), userRequestDto.getUsername(), UserRole.ADMIN.toString());

        User saveUser = authenticationRepo.save(user);
        return new UserResponseDto(saveUser.getEmail(), saveUser.getUsername());
    }

    @Override
    public LoginResDto signin(LoginReqDto request) {
        User user = authenticationRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new ServerErrorException(ErrorCode.INVALID_PASSWORD.getValue(), ErrorCode.INVALID_PASSWORD.getStatus()));
        // Create userDetails from the retrieved user information
        UserDetails userDetails = new CustomUserDetails(user.getUsername(), user.getPassword(), user.getRole());
        user.setPassword(null);
        // Generate a JWT token using userDetails
        String jwt = jwtService.generateToken(user, userDetails);
        return new LoginResDto("request.getEmail()", request.getUsername(), jwt);
    }
}
