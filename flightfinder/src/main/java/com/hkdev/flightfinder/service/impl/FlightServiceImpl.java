package com.hkdev.flightfinder.service.impl;

import com.hkdev.flightfinder.constants.TripMode;
import com.hkdev.flightfinder.dto.request.*;
import com.hkdev.flightfinder.dto.response.BookingResDto;
import com.hkdev.flightfinder.dto.response.FlightResDto;
import com.hkdev.flightfinder.dto.response.TripFlightDto;
import com.hkdev.flightfinder.entity.Airport;
import com.hkdev.flightfinder.entity.BookingDetail;
import com.hkdev.flightfinder.entity.Passenger;
import com.hkdev.flightfinder.repository.AirportRepo;
import com.hkdev.flightfinder.repository.BookingDetailRepo;
import com.hkdev.flightfinder.repository.FlightScheduleRepo;
import com.hkdev.flightfinder.repository.PassengerRepo;
import com.hkdev.flightfinder.service.FlightService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightScheduleRepo flightRepo;

    @Autowired
    private AirportRepo airportRepo;
    @Autowired
    private PassengerRepo passengerRepo;
    @Autowired
    private BookingDetailRepo bookingDetailRepo;

    @Override
    public TripFlightDto getFlightList(FlightRequestDto dto) {
        log.info("dto {} \n {} \n {} ", dto.getDepartureDate(), getStartDate(dto.getDepartureDate()), getEndDate(dto.getDepartureDate()));
        List<FlightResDto> departures = flightRepo.getFlightList(dto.getOriginalAirportId(), dto.getArrivalAirportId(), getStartDate(dto.getDepartureDate()), getEndDate(dto.getDepartureDate()));

        List<FlightResDto> returnFlights = new ArrayList<>();
        if (dto.getTripMode().equals(TripMode.ROUND_TRIP)) {
            returnFlights = flightRepo.getFlightList(dto.getArrivalAirportId(), dto.getOriginalAirportId(), getStartDate(dto.getReturnDate()), getEndDate(dto.getReturnDate()));
        }
        return new TripFlightDto(departures, returnFlights);
    }

    @Override
    public List<Airport> getAirports(AirportReqDto dto) {

        return dto.getExcludeAirportId() != null ? airportRepo.findAllByIdNot(dto.getExcludeAirportId()) : airportRepo.findAll();
    }

    @Override
    public TripFlightDto getTripFlightList(FlightTripReqDto dto) {
        List<FlightResDto> departures = flightRepo.getTripFlightList(dto.getDepartureFlightScheduleId());

        List<FlightResDto> returnFlights = new ArrayList<>();
        if (dto.getReturnFlightScheduleId() != null) {
            returnFlights = flightRepo.getTripFlightList(dto.getReturnFlightScheduleId());
            return new TripFlightDto(departures, returnFlights);
        }
        return new TripFlightDto(departures, returnFlights);
    }

    @Override
    @Transactional
    public BookingResDto bookFlight(FlightBookingDto dto) {
        log.info("flight booking dto {}", generateBookingRefId());
        String bookingId = generateBookingRefId();
        BookingDetail bookingDetail = new BookingDetail();
        bookingDetail.setBookingId(bookingId);
        bookingDetail.setDepartureFlightScheduleId(dto.getDepartureFlightScheduleId());
        bookingDetail.setReturnFlightScheduleId(dto.getReturnFlightScheduleId());
        bookingDetail.setPaymentDate(new Date());
        bookingDetail.setPaymentMethod("Credit/Debit");
        bookingDetail.setPaymentStatus("completed");
        List<Passenger> passengers = new ArrayList<>();
        for (PassengerDto passenger : dto.getPassengers()) {
            Passenger passenger1 = new Passenger();
            passenger1.setBookingId(bookingId);
            passenger1.setEmail(passenger.getEmail());
            passenger1.setGender(passenger.getGender());
            passenger1.setNationality(passenger.getNationality());
            passenger1.setFirstName(passenger.getFirstName());
            passenger1.setMiddleName(passenger.getMiddleName());
            passenger1.setLastName(passenger.getLastName());
            passenger1.setDateOfBirth(passenger.getDateOfBirth());
            passenger1.setPhoneNumber(passenger.getPhoneNo());

            passenger1.setPassportNumber(passenger.getPassportNumber());
            passenger1.setPassportIssueCountry(passenger.getIssuingCountry());
            passenger1.setPassportExpiryDate(passenger.getPassportExpiryDate());
            if (passenger.getPhoneNo() != null) {
                passenger1.setPrimaryContact(true);
            }
            passengers.add(passenger1);
        }
        bookingDetailRepo.save(bookingDetail);
        passengerRepo.saveAll(passengers);
        return new BookingResDto(bookingId, true);
    }

    public Date getStartDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 00);
        cal.set(Calendar.MINUTE, 00);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        log.info("date time {}", cal.getTime());

        return cal.getTime();
    }

    public Date getEndDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    private String generateBookingRefId() {
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 8);

        String prefix = "BOOK";

        return prefix + uuid.toUpperCase();
    }
}
