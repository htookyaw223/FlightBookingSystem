package com.hkdev.flightfinder.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Airports")
@Data
public class Airport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private String country;
    private String iataCode;  // International Air Transport Association code

//    @ToString.Exclude
//    @OneToMany(mappedBy = "originAirport", cascade = CascadeType.ALL)
//    private List<FlightSchedule> flightSchedules;
}