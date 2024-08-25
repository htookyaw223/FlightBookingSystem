package com.hkdev.flightfinder.repository;

import com.hkdev.flightfinder.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepo extends JpaRepository<Passenger, Long> {
}
