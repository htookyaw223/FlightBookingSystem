package com.hkdev.flightfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "Airline")
@Getter
@Setter
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String country;
    private String name;
    private String code;
    private String logo;

    @ToString.Exclude
    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    private List<Flight> flights;

}
