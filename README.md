# 💸 Razorpay Spring Boot + React Payment Demo

A full-stack payment integration example using **Spring Boot (Java)**, **MySQL**, and **React** to create and process Razorpay orders.

This app demonstrates how to:
✅ Create payment orders in your backend  
✅ Accept payments via Razorpay Checkout in React  
✅ Update payment status in your database  
✅ Use Razorpay **Test Mode** with dummy cards (no real money required!)

---

## ✨ Features

- React frontend with modern UI
- Spring Boot REST API to create/update Razorpay orders
- MySQL database to store order/payment details
- Razorpay Checkout integration in React
- Supports **Test Mode** payments with test cards

---

## 🛠 How It Works

1️⃣ **Frontend**:  
User enters name, email, phone number, and amount, then clicks **Pay Now**. React calls your Spring Boot API to create a new Razorpay order.

2️⃣ **Backend (Spring Boot)**:  
Creates a Razorpay order using Razorpay Java SDK, saves it in MySQL, and sends order details (order ID, amount, key) to the frontend.

3️⃣ **Razorpay Checkout**:  
Your React app uses Razorpay's JS SDK to open the payment modal with the order ID.

4️⃣ **Payment Status Update**:  
On payment completion, your React app calls the backend to update the order status in MySQL.

5️⃣ **Test Mode**:  
All transactions use Razorpay’s **Test Mode** – so you can try payments without real money.

---

## 🚀 Quick Setup

### 🔗 Prerequisites

- Java 17+
- Maven
- Node.js + npm
- MySQL running locally

---

### 🔨 Backend

1. Clone the repo and navigate to your backend folder.

2. Create a MySQL database:
   ```sql
   CREATE DATABASE razorpay_db;
   ```

3. Set your MySQL credentials and Razorpay test keys in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/razorpay_db
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD

   razorpay.key=YOUR_RAZORPAY_TEST_KEY_ID
   razorpay.secret=YOUR_RAZORPAY_TEST_SECRET_KEY
   ```

4. Build & run the Spring Boot app:
   ```bash
   mvn spring-boot:run
   ```

---

### 🌐 Frontend

1. Navigate to your React app folder.

2. Install dependencies:
   ```bash
   npm install
   npm install axios
   ```

3. Start the React app:
   ```bash
   npm start
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000) 🚀

---

## 🧪 Test Mode

**Test Mode** is Razorpay’s sandbox environment. When you use your Razorpay **Test API keys**, every transaction goes through Razorpay's simulated gateway — **no real money is used or deducted**, but everything else works exactly like live payments.

You’ll see test transactions in your Razorpay Dashboard when it’s switched to **Test Mode**.

---

## 💳 Test Cards

Use these test cards in Razorpay Checkout to simulate payments:

✅ **Successful Payment Card**  
- Card Number: `4111 1111 1111 1111`  
- Expiry: Any future date (e.g., 12/34)  
- CVV: Any 3 digits (e.g., 123)  

🚫 **Failed Payment Card**  
- Card Number: `4000 0000 0000 9995`  
- Expiry & CVV: Same as above  
- This will always fail the payment.

🔗 More test cards → [Razorpay Docs: Test Cards](https://razorpay.com/docs/payments/test-card-upi/#cards)

---

## ✅ What to Check

- On successful payment:
  - Alert: “Payment successful!”
  - MySQL database `payment_order` table should have `status="paid"`
  - Test payment shows up in your Razorpay Dashboard (Test Mode)
- On failed payment:
  - Payment modal shows payment failure
  - Database will not update status to `"paid"`

---

