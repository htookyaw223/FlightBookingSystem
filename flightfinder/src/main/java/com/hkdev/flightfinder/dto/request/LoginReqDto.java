package com.hkdev.flightfinder.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginReqDto {
    private String password;
    private String username;
}