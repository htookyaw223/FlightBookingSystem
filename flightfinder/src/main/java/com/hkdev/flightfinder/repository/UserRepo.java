package com.hkdev.flightfinder.repository;

import com.hkdev.flightfinder.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
