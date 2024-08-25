package com.hkdev.flightfinder.repository;

import com.hkdev.flightfinder.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDetailRepo extends JpaRepository<BookingDetail, Long> {
    
}
