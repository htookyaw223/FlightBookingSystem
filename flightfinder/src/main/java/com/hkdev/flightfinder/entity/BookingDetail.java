package com.hkdev.flightfinder.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "BookingDetail")
@Data
public class BookingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingDetailId;

    private Long departureFlightScheduleId;
    private Long returnFlightScheduleId;

    private String seatClass;
    private double price;

    private String paymentMethod;
    private String paymentStatus;
    private Date paymentDate;
    private String bookingId;
}
