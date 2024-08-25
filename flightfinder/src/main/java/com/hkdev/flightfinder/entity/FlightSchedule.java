package com.hkdev.flightfinder.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "FlightSchedule")
public class FlightSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "origin_airport_id")
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Airport originAirport;

    @JoinColumn(name = "destination_airport_id")
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Airport destinationAirport;

    @JoinColumn(name = "flight_id")
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Flight flight;

    private Date departureTime;
    private Date arrivalTime;
    private String seatClass;
    private double price;
}
