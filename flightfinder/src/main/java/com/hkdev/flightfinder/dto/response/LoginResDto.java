package com.hkdev.flightfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginResDto {
    private String email;
    private String username;
    private String token;
}