package com.hkdev.flightfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class TripFlightDto {
    List<FlightResDto> departureFlights;
    List<FlightResDto> returnFlights;
}
