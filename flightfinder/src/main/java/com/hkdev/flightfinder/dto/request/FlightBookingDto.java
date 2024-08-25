package com.hkdev.flightfinder.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class FlightBookingDto {

    List<PassengerDto> passengers;
    PaymentRequestDto paymentInfo;
    private Long departureFlightScheduleId;
    private Long returnFlightScheduleId;
    private Double price;
}
