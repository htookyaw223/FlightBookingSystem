package com.hkdev.flightfinder.dto.request;

import com.hkdev.flightfinder.constants.TripMode;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class FlightRequestDto {
    @NotNull
    private Long originalAirportId;
    private Long arrivalAirportId;

    @NotNull
    private Date departureDate;
    private Date returnDate;
    private TripMode tripMode;

}
