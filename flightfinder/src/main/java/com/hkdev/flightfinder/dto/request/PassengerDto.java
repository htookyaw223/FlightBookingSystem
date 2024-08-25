package com.hkdev.flightfinder.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class PassengerDto {
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private Date dateOfBirth;
    private String passportNumber;
    private String nationality;
    private String issuingCountry;
    private Date passportExpiryDate;
    private String email;
    private String phoneNo;
    private String address;
    private String docType;
}
