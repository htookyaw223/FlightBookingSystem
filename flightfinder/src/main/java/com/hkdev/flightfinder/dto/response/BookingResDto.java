package com.hkdev.flightfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingResDto {
    String bookingRefId;
    boolean status;
}
