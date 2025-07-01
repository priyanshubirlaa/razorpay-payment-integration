package com.example.razorpay.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId; // Razorpay order ID
    private String paymentId; // Razorpay payment ID
    private String status;    // created, paid, failed
    private Long amount;
}
