package com.hkdev.flightfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirportResDto {
    private Long id;
    private String name;
    private String city;
    private String country;
    private String iataCode;
}
