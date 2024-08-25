package com.hkdev.flightfinder.dto.request;

import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class AirportReqDto {
    @Nullable
    private Long excludeAirportId;
}
