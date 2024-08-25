package com.hkdev.flightfinder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class ServerErrorException extends HttpClientErrorException {
    public ServerErrorException(String message, HttpStatus status) {
        super(status, message);
    }
}
