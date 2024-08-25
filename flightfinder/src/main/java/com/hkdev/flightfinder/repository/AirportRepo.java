package com.hkdev.flightfinder.repository;

import com.hkdev.flightfinder.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AirportRepo extends JpaRepository<Airport, Long> {
    List<Airport> findAllByIdNot(Long excludeAirportId);
}
