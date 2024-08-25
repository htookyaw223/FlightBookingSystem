package com.hkdev.flightfinder.dto.request;

import lombok.Data;

@Data
public class TripSummaryDto {
    private String departureFlightId;
    private String returnFlightId;
}
