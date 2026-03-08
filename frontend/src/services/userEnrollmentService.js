const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMyEnrollments = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/enrollments/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch enrollments");
  }

  return data;
};
