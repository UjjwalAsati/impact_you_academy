const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ==============================
// GET COMMON BROCHURE LINK
// ==============================
export const fetchBrochureLink = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/settings/brochure`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch brochure link"
    );
  }

  return data.brochureLink || "";
};

// ==============================
// UPDATE COMMON BROCHURE LINK
// ADMIN ONLY
// ==============================
export const updateBrochureLink = async (
  brochureLink,
  token
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/settings/brochure`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        brochureLink,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update brochure link"
    );
  }

  return data;
};