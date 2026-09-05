import API_URL from "../config";

const ADMIN_CACHE_KEY = "infozatech_admin_verifications_cache_v1";

/**
 * Fetch all verification records (For Admin Panel)
 */
export const fetchVerifications = async () => {
  try {
    const res = await fetch(`${API_URL}/api/verifications`, {
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      try {
        localStorage.setItem(ADMIN_CACHE_KEY, JSON.stringify(data.data));
      } catch (e) {
        console.warn("Could not cache to localStorage", e);
      }
      return { success: true, data: data.data };
    }
    return { success: false, message: data.message || "Failed to load verification records.", data: [] };
  } catch (err) {
    console.error("Error fetching verifications:", err);
    // Fallback only for Admin view if available
    try {
      const cached = localStorage.getItem(ADMIN_CACHE_KEY);
      if (cached) {
        return { success: true, data: JSON.parse(cached), isOffline: true };
      }
    } catch (e) {}
    return { success: false, message: "Cannot connect to server. Please ensure backend is running.", data: [] };
  }
};

/**
 * Create a new verification record (Admin)
 */
export const createVerification = async (record) => {
  try {
    const res = await fetch(`${API_URL}/api/verifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error creating verification:", err);
    return { success: false, message: "Network error: Unable to connect to server." };
  }
};

/**
 * Update an existing verification record (Admin)
 */
export const updateVerification = async (id, updatedFields) => {
  try {
    const res = await fetch(`${API_URL}/api/verifications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error updating verification:", err);
    return { success: false, message: "Network error: Unable to connect to server." };
  }
};

/**
 * Revoke a verification record (Admin)
 */
export const revokeVerification = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/verifications/${id}/revoke`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error revoking verification:", err);
    return { success: false, message: "Network error: Unable to connect to server." };
  }
};

/**
 * Delete a verification record (Admin)
 */
export const deleteVerification = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/verifications/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error deleting verification:", err);
    return { success: false, message: "Network error: Unable to connect to server." };
  }
};

/**
 * Public document verification lookup (Public /verify page)
 * CRITICAL: NEVER uses browser localStorage. Backend is the single source of truth.
 * If backend is unavailable, returns a proper service error.
 */
export const verifyDocumentById = async (verificationId) => {
  if (!verificationId || !verificationId.trim()) {
    return {
      success: false,
      found: false,
      message: "Please enter a valid Verification ID."
    };
  }

  const cleanId = encodeURIComponent(verificationId.trim());

  try {
    const res = await fetch(`${API_URL}/api/verifications/verify/${cleanId}`, {
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    if (res.status === 404 || !data.found) {
      return {
        success: false,
        found: false,
        status: "Invalid",
        message: data.message || "We could not find a valid document associated with this Verification ID."
      };
    }

    if (data.success && data.data) {
      return {
        success: true,
        found: true,
        status: data.status || data.data.status || "Verified",
        message: data.message,
        data: data.data
      };
    }

    return {
      success: false,
      found: false,
      status: "Invalid",
      message: data.message || "Verification lookup failed. Please check the ID."
    };

  } catch (err) {
    console.error("Public verification API connection error:", err);
    return {
      success: false,
      isServiceError: true,
      found: false,
      message: "Verification service is temporarily unavailable. Please check your connection and try again."
    };
  }
};
