package com.example.razorpay.controller;

import com.example.razorpay.model.PaymentOrder;
import com.example.razorpay.repository.PaymentOrderRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // Allow React frontend calls
public class PaymentController {

    private final PaymentOrderRepository paymentOrderRepository;

    @Value("${razorpay.key}")
    private String razorpayKey;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    public PaymentController(PaymentOrderRepository repo) {
        this.paymentOrderRepository = repo;
    }

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        Long amount = Long.parseLong(data.get("amount").toString()) * 100; // amount in paise

        RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(orderRequest);

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setOrderId(order.get("id"));
        paymentOrder.setAmount(amount);
        paymentOrder.setStatus("created");
        paymentOrderRepository.save(paymentOrder);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", amount);
        response.put("currency", "INR");
        response.put("key", razorpayKey);

        return response;
    }

    @PostMapping("/update-status")
    public String updateStatus(@RequestBody Map<String, Object> data) {
        String orderId = data.get("orderId").toString();
        String paymentId = data.get("paymentId").toString();
        String status = data.get("status").toString();

        PaymentOrder order = paymentOrderRepository.findByOrderId(orderId);
        if (order != null) {
            order.setPaymentId(paymentId);
            order.setStatus(status);
            paymentOrderRepository.save(order);
            return "Payment status updated!";
        } else {
            return "Order not found!";
        }
    }
}
