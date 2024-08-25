package com.hkdev.flightfinder.dto.request;

import lombok.Data;

@Data
class PaymentRequestDto {
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    private String cardholderName;
}
