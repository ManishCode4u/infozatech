import API_URL from "../config";

const STORAGE_KEY = 'infozatech_submitted_applications_v2';

/**
 * Fetch applications from backend API or local fallback
 */
export const fetchApplications = async () => {
  try {
    const res = await fetch(`${API_URL}/api/applications?t=${Date.now()}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
      } catch (e) {}
      return { success: true, data: data.data };
    }
  } catch (err) {
    console.error('Error fetching applications:', err);
  }
  return { success: true, data: getStoredApplications(), isOffline: true };
};

export const getStoredApplications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading stored applications:', err);
  }
  return [];
};

export const saveNewApplication = async (application) => {
  try {
    const existing = getStoredApplications();
    const newEntry = {
      id: 'app-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      createdAt: new Date().toISOString(),
      status: 'New',
      ...application
    };
    const updated = [newEntry, ...existing];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    // Async sync to backend
    fetch(`${API_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    }).catch(err => console.log('Backend sync error:', err));

    return newEntry;
  } catch (err) {
    console.error('Error saving application:', err);
    return null;
  }
};

export const deleteStoredApplication = async (id) => {
  try {
    const existing = getStoredApplications();
    const updated = existing.filter(a => String(a.id) !== String(id));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    // Delete from backend API
    fetch(`${API_URL}/api/applications/${id}`, {
      method: "DELETE"
    }).catch(err => console.log('Backend delete application error:', err));

    return updated;
  } catch (err) {
    console.error('Error deleting stored application:', err);
    return [];
  }
};

