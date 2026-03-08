const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPrograms = async () => {
  const response = await fetch(`${API_BASE_URL}/api/programs`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch programs");
  }

  return data;
};
export const fetchProgramById = async (programId) => {
  const response = await fetch(`${API_BASE_URL}/api/programs/${programId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch program");
  }

  return data;
};
