package com.hkdev.flightfinder.service;

import com.hkdev.flightfinder.dto.request.AirportReqDto;
import com.hkdev.flightfinder.dto.request.FlightBookingDto;
import com.hkdev.flightfinder.dto.request.FlightRequestDto;
import com.hkdev.flightfinder.dto.request.FlightTripReqDto;
import com.hkdev.flightfinder.dto.response.BookingResDto;
import com.hkdev.flightfinder.dto.response.TripFlightDto;
import com.hkdev.flightfinder.entity.Airport;

import java.util.List;


public interface FlightService {
    TripFlightDto getFlightList(FlightRequestDto dto);

    List<Airport> getAirports(AirportReqDto dto);

    TripFlightDto getTripFlightList(FlightTripReqDto dto);

    BookingResDto bookFlight(FlightBookingDto dto);
}
