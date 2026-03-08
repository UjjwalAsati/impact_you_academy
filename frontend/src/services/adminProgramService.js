const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all programs
export const fetchPrograms = async () => {
  const response = await fetch(`${API_BASE_URL}/api/programs`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch programs");
  }

  return data;
};

// Create program
export const createProgram = async (programData, token) => {
  const response = await fetch(`${API_BASE_URL}/api/programs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(programData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create program");
  }

  return data;
};

// Toggle status
export const toggleProgramStatus = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/api/programs/${id}/deactivate`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update program status");
  }

  return data;
};