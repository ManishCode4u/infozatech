import { useState, useEffect, useCallback } from "react";
import API_URL from "../config";

export const INTERNSHIP_SETTINGS_CACHE_KEY = "infozatech_internship_apply_link_cache_v1";
export const INTERNSHIP_SETTINGS_EVENT = "internship_settings_updated";

export const DEFAULT_INTERNSHIP_SETTINGS = {
  applyUrl: "https://forms.gle/SjDCcUxkjRAGpDRx6",
  submissionUrl: "https://forms.gle/oS3KLgW8nnPpxKXA6",
  lastUpdated: new Date().toISOString()
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
 * Fetch internship apply link settings from backend API
 */
export const fetchInternshipSettings = async () => {
  try {
    const timestamp = new Date().getTime();
    const res = await fetch(`${API_URL}/api/settings/internship?t=${timestamp}`, {
      headers: { "Content-Type": "application/json" }
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        const merged = { ...DEFAULT_INTERNSHIP_SETTINGS, ...data.data };
        try {
          localStorage.setItem(INTERNSHIP_SETTINGS_CACHE_KEY, JSON.stringify(merged));
        } catch (e) {}
        
        // Dispatch custom event for real-time reactive sync across components
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent(INTERNSHIP_SETTINGS_EVENT, { detail: merged }));
        }
        return { success: true, data: merged };
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
      const merged = { ...DEFAULT_INTERNSHIP_SETTINGS, ...data.data };
      try {
        localStorage.setItem(INTERNSHIP_SETTINGS_CACHE_KEY, JSON.stringify(merged));
      } catch (e) {}

      // Dispatch event to update all components in current window
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(INTERNSHIP_SETTINGS_EVENT, { detail: merged }));
      }
      return { success: true, data: merged };
    }
    return data;
  } catch (err) {
    console.error("Error updating internship apply link:", err);
    return { success: false, message: "Cannot connect to server. Please try again." };
  }
};

/**
 * React Hook for real-time synced internship settings across all pages & components
 */
export function useInternshipSettings() {
  const [settings, setSettings] = useState(() => getCachedInternshipSettings());
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await fetchInternshipSettings();
    if (res.success && res.data) {
      setSettings(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // 1. Fetch fresh on mount
    refresh();

    // 2. Listen for internal in-app updates
    const handleUpdate = (e) => {
      if (e?.detail) {
        setSettings(e.detail);
      } else {
        setSettings(getCachedInternshipSettings());
      }
    };

    // 3. Listen for cross-tab storage updates
    const handleStorage = (e) => {
      if (e.key === INTERNSHIP_SETTINGS_CACHE_KEY) {
        setSettings(getCachedInternshipSettings());
      }
    };

    window.addEventListener(INTERNSHIP_SETTINGS_EVENT, handleUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(INTERNSHIP_SETTINGS_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refresh]);

  const applyUrl = settings?.applyUrl || DEFAULT_INTERNSHIP_SETTINGS.applyUrl;
  const submissionUrl = settings?.submissionUrl || DEFAULT_INTERNSHIP_SETTINGS.submissionUrl;

  return {
    settings,
    applyUrl,
    submissionUrl,
    lastUpdated: settings?.lastUpdated,
    loading,
    refetch: refresh
  };
}

