const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createEnrollment = async (programId, token) => {
  const response = await fetch(`${API_BASE_URL}/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ programId })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Enrollment failed");
  }

  return data;
};
