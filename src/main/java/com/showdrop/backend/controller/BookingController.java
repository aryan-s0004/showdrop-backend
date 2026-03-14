package com.showdrop.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @PostMapping
    public String createBooking(){
        return "Booking created";
    }

}
