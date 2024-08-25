package com.hkdev.flightfinder.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "Passenger")
@Getter
@Setter
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long passengerId;

    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private Date dateOfBirth;
    private String passportNumber;
    private String nationality;
    private String passportIssueCountry;
    private Date passportExpiryDate;
    private String email;
    private String phoneNumber;
    private boolean isPrimaryContact;
    private String bookingId;
}