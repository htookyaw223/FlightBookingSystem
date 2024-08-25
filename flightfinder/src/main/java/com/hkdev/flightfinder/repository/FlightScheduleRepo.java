package com.hkdev.flightfinder.repository;

import com.hkdev.flightfinder.dto.response.FlightResDto;
import com.hkdev.flightfinder.entity.FlightSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface FlightScheduleRepo extends JpaRepository<FlightSchedule, Long> {

    @Query(
            "Select new com.hkdev.flightfinder.dto.response.FlightResDto(fs.id,fs.flight.flightNumber, fs.originAirport, fs.destinationAirport, " +
                    "fs.departureTime, fs.arrivalTime, fs.seatClass, fs.price, fs.flight.airline) " +
                    "FROM  FlightSchedule fs WHERE fs.originAirport.id=:originId AND fs.destinationAirport.id=:destinationId " +
                    "AND fs.departureTime between :startDate and :endDate"
    )
    List<FlightResDto> getFlightList(Long originId, Long destinationId, Date startDate, Date endDate);

    @Query(
            "Select new com.hkdev.flightfinder.dto.response.FlightResDto(fs.id,fs.flight.flightNumber, fs.originAirport, fs.destinationAirport, " +
                    "fs.departureTime, fs.arrivalTime, fs.seatClass, fs.price, fs.flight.airline) " +
                    "FROM  FlightSchedule fs WHERE fs.id=:id "
    )
    List<FlightResDto> getTripFlightList(Long id);
}
