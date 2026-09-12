import API_URL from "../config";

const INTERNSHIP_SETTINGS_CACHE_KEY = "infozatech_internship_apply_link_cache_v1";

export const DEFAULT_INTERNSHIP_SETTINGS = {
  applyUrl: "https://forms.gle/SjDCcUxkjRAGpDRx6",
  lastUpdated: new Date().toISOString()
};

/**
 * Fetch internship apply link settings
 */
export const fetchInternshipSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/api/settings/internship`, {
      headers: { "Content-Type": "application/json" }
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        try {
          localStorage.setItem(INTERNSHIP_SETTINGS_CACHE_KEY, JSON.stringify(data.data));
        } catch (e) {}
        return { success: true, data: data.data };
      }
    }
    
    const cached = getCachedInternshipSettings();
    return { success: true, data: cached, isOffline: true };
  } catch (err) {
    console.error("Error fetching internship apply link:", err);
    const cached = getCachedInternshipSettings();
    return { success: true, data: cached, isOffline: true };
  }
};

/**
 * Helper to synchronously get cached settings or default applyUrl
 */
export const getCachedInternshipSettings = () => {
  try {
    const cached = localStorage.getItem(INTERNSHIP_SETTINGS_CACHE_KEY);
    if (cached) {
      return { ...DEFAULT_INTERNSHIP_SETTINGS, ...JSON.parse(cached) };
    }
  } catch (e) {}
  return DEFAULT_INTERNSHIP_SETTINGS;
};

export const getInternshipSettings = getCachedInternshipSettings;

/**
 * Update internship apply link (Admin)
 */
export const updateInternshipSettings = async (settings) => {
  try {
    const res = await fetch(`${API_URL}/api/settings/internship`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });
    const data = await res.json();
    if (data.success && data.data) {
      try {
        localStorage.setItem(INTERNSHIP_SETTINGS_CACHE_KEY, JSON.stringify(data.data));
      } catch (e) {}
    }
    return data;
  } catch (err) {
    console.error("Error updating internship apply link:", err);
    return { success: false, message: "Cannot connect to server. Please try again." };
  }
};
