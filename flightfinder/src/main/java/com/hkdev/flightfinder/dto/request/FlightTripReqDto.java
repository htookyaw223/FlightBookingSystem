package com.hkdev.flightfinder.dto.request;

import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class FlightTripReqDto {
    private Long departureFlightScheduleId;
    @Nullable
    private Long returnFlightScheduleId;
}
