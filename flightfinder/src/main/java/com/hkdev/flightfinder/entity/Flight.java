package com.hkdev.flightfinder.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Flight")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flightNumber;

    @JoinColumn(name = "airline_id")
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Airline airline;

    @ToString.Exclude
    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<FlightSchedule> flightSchedules;

    private String frequency;
    private Integer availableSeat;
}
