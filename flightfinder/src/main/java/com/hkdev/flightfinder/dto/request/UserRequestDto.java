package com.hkdev.flightfinder.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserRequestDto {
    private String email;
    private String password;
    private String confirmPassword;
    private String username;
}
