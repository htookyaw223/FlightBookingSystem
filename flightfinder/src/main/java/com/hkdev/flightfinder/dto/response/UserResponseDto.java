package com.hkdev.flightfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserResponseDto {
    private String username;
    private String email;
}
