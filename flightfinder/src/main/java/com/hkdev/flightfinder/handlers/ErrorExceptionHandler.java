package com.hkdev.flightfinder.handlers;

import com.hkdev.flightfinder.exception.CustomErrorException;
import com.hkdev.flightfinder.exception.ServerErrorException;
import com.hkdev.flightfinder.validations.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.time.Instant;

@ControllerAdvice
public class ErrorExceptionHandler {

    @ExceptionHandler(CustomErrorException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseFormat> handleCustomErrorException(final CustomErrorException e) {
        ErrorCode errorCode = ErrorCode.resolveCode(e.getStatusText());
        ErrorResponseFormat error = new ErrorResponseFormat(errorCode,errorCode.getValue(), Instant.now());
        return new ResponseEntity<>(error, errorCode.getStatus());
    }
    @ExceptionHandler(ServerErrorException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseFormat> handleServerErrorException1(final ServerErrorException e) {
        ErrorResponseFormat error = new ErrorResponseFormat(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage(), Instant.now());
        return new ResponseEntity<>(error, ErrorCode.INTERNAL_SERVER_ERROR.getStatus());
    }
}
