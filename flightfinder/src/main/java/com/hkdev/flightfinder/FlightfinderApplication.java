package com.hkdev.flightfinder;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class FlightfinderApplication {
    @Value("${application.timezone:UTC}")
    private String applicationTimeZone;

    public static void main(String[] args) {
        SpringApplication.run(FlightfinderApplication.class, args);
    }


    @PostConstruct
    public void executeAfterMain() {
        System.out.println("default timezone : " + TimeZone.getTimeZone(applicationTimeZone));
    
        TimeZone.setDefault(TimeZone.getTimeZone(applicationTimeZone));
    }
}
