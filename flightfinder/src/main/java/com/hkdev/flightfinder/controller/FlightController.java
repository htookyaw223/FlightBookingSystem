package com.hkdev.flightfinder.controller;

import com.hkdev.flightfinder.dto.request.AirportReqDto;
import com.hkdev.flightfinder.dto.request.FlightBookingDto;
import com.hkdev.flightfinder.dto.request.FlightRequestDto;
import com.hkdev.flightfinder.dto.request.FlightTripReqDto;
import com.hkdev.flightfinder.dto.response.BookingResDto;
import com.hkdev.flightfinder.dto.response.TripFlightDto;
import com.hkdev.flightfinder.entity.Airport;
import com.hkdev.flightfinder.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FlightController {

    @Autowired
    private FlightService flightService;


    @PostMapping("/flights")
    public TripFlightDto getFlightList(@RequestBody FlightRequestDto dto) {

        return flightService.getFlightList(dto);
    }

    @PostMapping("/airports")
    public List<Airport> getAirports(@RequestBody AirportReqDto dto) {
        return flightService.getAirports(dto);
    }

    @PostMapping("/book-flight")
    public BookingResDto bookFlight(@RequestBody FlightBookingDto dto) {
        return flightService.bookFlight(dto);
    }

    @PostMapping("/trip-flights")
    public TripFlightDto getTripFlightList(@RequestBody FlightTripReqDto dto) {

        return flightService.getTripFlightList(dto);
    }
}
