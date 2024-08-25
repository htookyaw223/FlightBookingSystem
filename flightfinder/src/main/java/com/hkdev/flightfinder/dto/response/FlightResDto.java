package com.hkdev.flightfinder.dto.response;

import com.hkdev.flightfinder.entity.Airline;
import com.hkdev.flightfinder.entity.Airport;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class FlightResDto {
    private Long flightScheduleId;
    private String flightNo;
    private AirportResDto originAirport;
    private AirportResDto arrivalAirport;
    private Date departureTime;
    private Date arrivalTime;
    private String seat_class;
    private Double price;
    private String airLineName;
    private String airLineLogo;

    public FlightResDto(Long flightScheduleId, String flightNo, Airport originAirport, Airport arrivalAirport, Date departureTime, Date arrivalTime, String seat_class, Double price, Airline airline) {
        this.flightScheduleId = flightScheduleId;
        this.flightNo = flightNo;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.seat_class = seat_class;
        this.price = price;
        this.airLineName = airline.getName();
        this.airLineLogo = airline.getLogo();
        if (originAirport != null) {
            AirportResDto originAirportDto = new AirportResDto(originAirport.getId(), originAirport.getName(), originAirport.getCity(), originAirport.getCountry(), originAirport.getIataCode());
            this.originAirport = originAirportDto;
        }
        if (arrivalAirport != null) {
            AirportResDto arrivalAirportDto = new AirportResDto(arrivalAirport.getId(), arrivalAirport.getName(), arrivalAirport.getCity(), arrivalAirport.getCountry(), arrivalAirport.getIataCode());
            this.arrivalAirport = arrivalAirportDto;
        }
    }
}
