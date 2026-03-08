const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchInquiries = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const updateInquiryStatus = async (id, status, token) => {
  await fetch(`${API_BASE_URL}/api/inquiries/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
};
