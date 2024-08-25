package com.hkdev.flightfinder.service;

import com.hkdev.flightfinder.dto.request.LoginReqDto;
import com.hkdev.flightfinder.dto.request.UserRequestDto;
import com.hkdev.flightfinder.dto.response.LoginResDto;
import com.hkdev.flightfinder.dto.response.UserResponseDto;
import com.hkdev.flightfinder.entity.User;
import org.springframework.stereotype.Service;


public interface AuthenticationService {
    public User findByUserName(String username);

    UserResponseDto signUp(UserRequestDto userRequestDto);

    LoginResDto signin(LoginReqDto request);
}
