package com.hkdev.flightfinder.exception;

import com.hkdev.flightfinder.validations.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class CustomErrorException extends HttpClientErrorException {
    public CustomErrorException(String message, HttpStatus status) {
        super(status, message);
    }

    public CustomErrorException(ErrorCode errorCode){
        super(errorCode.getStatus(), errorCode.getValue());
    }

}