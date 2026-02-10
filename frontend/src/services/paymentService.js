const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPaymentOrder = async (programId, token) => {
  const res = await fetch(`${API_BASE_URL}/payments/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ programId })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Payment order creation failed");
  }

  return data;
};
