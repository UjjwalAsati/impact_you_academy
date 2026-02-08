const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEnrollments = async (token) => {
  const response = await fetch(`${API_BASE_URL}/enrollments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch enrollments");
  }

  return data;
};
