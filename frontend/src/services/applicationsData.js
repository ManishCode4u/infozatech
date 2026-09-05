const STORAGE_KEY = 'infozatech_submitted_applications_v1';

// Seed initial demo/sample application if empty so admin has initial data
const INITIAL_APPLICATIONS = [
  {
    id: 'app-seed-1',
    name: 'Aakash Verma',
    email: 'aakash.v@example.com',
    contact: '+91 98765 12345',
    role: 'Technical Co-Founder & Partner',
    location: 'Patna, Bihar',
    whyJoinUs: 'I have 5 years building scalable web apps, managing tech teams, and leading client presentations in both Hindi and English. Passionate about scaling InfozaTech to the next level.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'New'
  }
];

export const getStoredApplications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
  } catch (err) {
    console.error('Error loading stored applications:', err);
  }
  return INITIAL_APPLICATIONS;
};

export const saveNewApplication = (application) => {
  try {
    const existing = getStoredApplications();
    const newEntry = {
      id: 'app-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      createdAt: new Date().toISOString(),
      status: 'New',
      ...application
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error('Error saving application locally:', err);
    return null;
  }
};

export const deleteStoredApplication = (id) => {
  try {
    const existing = getStoredApplications();
    const updated = existing.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting stored application:', err);
    return [];
  }
};
