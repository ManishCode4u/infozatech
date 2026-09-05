import API_URL from "../config";

const NOTES_CACHE_KEY = "infozatech_admin_notes_cache_v1";

/**
 * Fetch all notes
 */
export const fetchNotes = async () => {
  try {
    const res = await fetch(`${API_URL}/api/notes`, {
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      try {
        localStorage.setItem(NOTES_CACHE_KEY, JSON.stringify(data.data));
      } catch (e) {}
      return { success: true, data: data.data };
    }
    return { success: false, message: data.message || "Failed to fetch notes", data: [] };
  } catch (err) {
    console.error("Error fetching notes:", err);
    try {
      const cached = localStorage.getItem(NOTES_CACHE_KEY);
      if (cached) {
        return { success: true, data: JSON.parse(cached), isOffline: true };
      }
    } catch (e) {}
    return { success: false, message: "Cannot connect to server.", data: [] };
  }
};

/**
 * Create a new note
 */
export const createNote = async (note) => {
  try {
    const res = await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error creating note:", err);
    return { success: false, message: "Failed to connect to server." };
  }
};

/**
 * Update an existing note
 */
export const updateNote = async (id, updatedFields) => {
  try {
    const res = await fetch(`${API_URL}/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error updating note:", err);
    return { success: false, message: "Failed to connect to server." };
  }
};

/**
 * Toggle pin status of a note
 */
export const togglePinNote = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/notes/${id}/pin`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error pinning note:", err);
    return { success: false, message: "Failed to connect to server." };
  }
};

/**
 * Delete a note
 */
export const deleteNote = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error deleting note:", err);
    return { success: false, message: "Failed to connect to server." };
  }
};
