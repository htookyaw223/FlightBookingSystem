package com.hkdev.flightfinder.validations;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    DEFAULT_ERROR("Unknown Error", HttpStatus.BAD_REQUEST),
    RESOURCE_NOT_FOUND("Resourece Not Found",HttpStatus.NOT_FOUND),
    //Authorization Codes
    INVALID_TOKEN("Access token is invalid", HttpStatus.FORBIDDEN),
    PARENT_NOT_FOUND( "Parent Not Found", HttpStatus.BAD_REQUEST),
    INTERNAL_SERVER_ERROR("",HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_EXPIRED("Token expired!", HttpStatus.UNAUTHORIZED);

    private final String value;
    private final HttpStatus httpStatus;

    ErrorCode(String value, HttpStatus httpStatus) {
        this.value = value;
        this.httpStatus = httpStatus;
    }

    public static ErrorCode resolveCode(String code) {
        for (ErrorCode e : values()) {
            if (e.getCode().equals(code)) {
                return e;
            }
        }
        return DEFAULT_ERROR;
    }

    public static ErrorCode resolveValue(String value) {
        for (ErrorCode e : values()) {
            if (e.getValue().equalsIgnoreCase(value)) {
                return e;
            }
        }
        return DEFAULT_ERROR;
    }

    public static String resolveCodeAndGetValue(String code) {
        for (ErrorCode e : values()) {
            if (e.getCode().equals(code)) {
                return e.getValue();
            }
        }
        return DEFAULT_ERROR.getValue();
    }

    public String getValue() {
        return value;
    }

    public String getCode() {
        return name();
    }

    public HttpStatus getStatus() {
        return httpStatus;
    }
}
