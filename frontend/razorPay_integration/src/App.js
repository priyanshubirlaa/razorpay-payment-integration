import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handlePayment = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/payment/create-order', { amount });
      const orderData = res.data;

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        handler: async function (response) {
          await axios.post('http://localhost:8080/api/payment/update-status', {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            status: 'paid'
          });
          alert('Payment successful!');
        },
        prefill: {
          name,
          email,
          contact
        },
        theme: {
          color: "#6366f1"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Error initiating payment');
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #6366f1, #9333ea)",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "3rem",
        borderRadius: "1rem",
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "350px"
      }}>
        <h1 style={{
          marginBottom: "1rem",
          fontSize: "1.75rem",
          color: "#4f46e5"
        }}>
          Pay with Razorpay
        </h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={contact}
          onChange={e => setContact(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Amount (INR)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ ...inputStyle, marginBottom: "1.5rem" }}
        />
        <button
          onClick={handlePayment}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  borderRadius: "0.5rem",
  border: "1px solid #d1d5db",
  marginBottom: "1rem",
  outlineColor: "#6366f1",
  transition: "all 0.3s"
};

const buttonStyle = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  backgroundColor: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
  transition: "background-color 0.3s"
};

export default App;
