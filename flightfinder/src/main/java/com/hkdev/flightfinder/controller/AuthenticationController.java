package com.hkdev.flightfinder.controller;

import com.hkdev.flightfinder.dto.request.LoginReqDto;
import com.hkdev.flightfinder.dto.request.UserRequestDto;
import com.hkdev.flightfinder.dto.response.LoginResDto;
import com.hkdev.flightfinder.dto.response.UserResponseDto;
import com.hkdev.flightfinder.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/auth/register")
    public @ResponseBody UserResponseDto signUp(@RequestBody UserRequestDto userRequestDto) {
        return authenticationService.signUp(userRequestDto);
    }

    @PostMapping("/auth/login")
    public @ResponseBody LoginResDto signIn(@RequestBody LoginReqDto dto) {
        return authenticationService.signin(dto);
    }
}
