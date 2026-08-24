// frontend/src/services/paymentService.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

// ==============================
// CREATE PAYMENT ORDER
// ==============================
export const createPaymentOrder = async (
  programId,
  token,
  paymentType,
  enrollmentId = null
) => {
  const res = await fetch(
    `${API_BASE_URL}/api/payments/create-order`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify({
        programId,
        paymentType,
        enrollmentId
      })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Payment order creation failed"
    );
  }

  return data;
};

// ==============================
// VERIFY PAYMENT
// ==============================
export const verifyPayment = async (
  paymentResponse,
  token
) => {
  const res = await fetch(
    `${API_BASE_URL}/api/payments/verify`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(
        paymentResponse
      )
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Payment verification failed"
    );
  }

  return data;
};

// ==============================
// GET MY ENROLLMENTS
// ==============================
export const getMyEnrollments = async (
  token
) => {
  const res = await fetch(
    `${API_BASE_URL}/api/enrollments/my`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch enrollments"
    );
  }

  return data;
};