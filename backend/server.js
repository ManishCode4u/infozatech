require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS allowing localhost and other origins
app.use(cors({
  origin: '*', // Allow all for testing purposes as requested
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

const fs = require('fs');
const path = require('path');

// File paths for persistence database
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');
const LEADS_FILE = path.join(__dirname, 'leads.json');
const APPLICATIONS_FILE = path.join(__dirname, 'applications.json');
const VERIFICATIONS_FILE = path.join(__dirname, 'verifications.json');
const NOTES_FILE = path.join(__dirname, 'notes.json');

// Helper to read data from file
const readData = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(`Error reading from ${filePath}:`, error);
    return [];
  }
};

// Helper to write data to file
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
};

// Database state loaded from files
const contacts = readData(CONTACTS_FILE);
const leads = readData(LEADS_FILE);
const applications = readData(APPLICATIONS_FILE);
let verifications = readData(VERIFICATIONS_FILE);
let notes = readData(NOTES_FILE);

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 1. Test route
app.get('/api/test', (req, res) => {
  res.json({ message: "API working" });
});

// 2. GET all contacts
app.get('/api/contacts', (req, res) => {
  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts
  });
});

// 3. POST new contact
app.post('/api/contacts', (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email format" 
      });
    }

    // Save data in memory
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    writeData(CONTACTS_FILE, contacts);

    // Return success response
    res.status(201).json({
      success: true,
      message: "Contact saved successfully",
      data: newContact
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 4. GET all leads
app.get('/api/leads', (req, res) => {
  res.status(200).json({
    success: true,
    count: leads.length,
    data: leads
  });
});

// 5. POST new lead from popup
app.post('/api/leads', (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid email is required" 
      });
    }

    const newLead = {
      id: Date.now().toString(),
      email,
      status: "New",
      isImportant: false,
      createdAt: new Date().toISOString()
    };
    
    leads.push(newLead);
    writeData(LEADS_FILE, leads);

    res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      data: newLead
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 6. GET all applications
app.get('/api/applications', (req, res) => {
  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications
  });
});

// 7. POST new application
app.post('/api/applications', (req, res) => {
  try {
    const { name, email, contact, role, location, whyJoinUs } = req.body;

    // Validate inputs
    if (!name || !email || !contact || !role || !location || !whyJoinUs) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email format" 
      });
    }

    const newApplication = {
      id: Date.now().toString(),
      name,
      email,
      contact,
      role,
      location,
      whyJoinUs,
      createdAt: new Date().toISOString()
    };
    
    applications.push(newApplication);
    writeData(APPLICATIONS_FILE, applications);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApplication
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 8. DELETE application
app.delete('/api/applications/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = applications.findIndex(app => app.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    applications.splice(index, 1);
    writeData(APPLICATIONS_FILE, applications);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully"
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
// 9. GET all verification records (Admin)
app.get('/api/verifications', (req, res) => {
  try {
    verifications = readData(VERIFICATIONS_FILE);
    res.status(200).json({
      success: true,
      count: verifications.length,
      data: verifications
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 10. GET public verification lookup by ID (Public - No Admin Auth Required)
app.get('/api/verifications/verify/:verificationId', (req, res) => {
  try {
    const rawId = req.params.verificationId || "";
    const cleanId = rawId.trim().toLowerCase();

    if (!cleanId) {
      return res.status(400).json({
        success: false,
        found: false,
        message: "Please enter a valid Verification ID"
      });
    }

    verifications = readData(VERIFICATIONS_FILE);

    // Case-insensitive lookup matching verificationId, or certificateId, or internshipId
    const record = verifications.find(v => 
      (v.verificationId && v.verificationId.trim().toLowerCase() === cleanId) ||
      (v.certificateId && v.certificateId.trim().toLowerCase() === cleanId) ||
      (v.internshipId && v.internshipId.trim().toLowerCase() === cleanId)
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        found: false,
        message: "We could not find a valid document associated with this Verification ID."
      });
    }

    // Public sanitized payload (excludes internal notes or private database info)
    const publicDoc = {
      studentName: record.studentName,
      verificationId: record.verificationId,
      documentType: record.documentType,
      internshipId: record.internshipId || "",
      certificateId: record.certificateId || "",
      domain: record.domain,
      startDate: record.startDate,
      endDate: record.endDate,
      duration: record.duration,
      status: record.status || "Verified",
      issuedBy: record.issuedBy || "InfozaTech",
      createdAt: record.createdAt
    };

    if (record.status === "Revoked") {
      return res.status(200).json({
        success: true,
        found: true,
        status: "Revoked",
        message: "This document is no longer valid according to InfozaTech records.",
        data: publicDoc
      });
    }

    return res.status(200).json({
      success: true,
      found: true,
      status: "Verified",
      message: "Document verified successfully.",
      data: publicDoc
    });

  } catch (error) {
    console.error("Public Verification Server Error:", error);
    res.status(500).json({ 
      success: false, 
      found: false,
      message: "Verification service temporarily unavailable. Please try again." 
    });
  }
});

// 11. POST new verification record (Admin)
app.post('/api/verifications', (req, res) => {
  try {
    const { 
      studentName, 
      verificationId, 
      documentType, 
      internshipId, 
      certificateId, 
      domain, 
      startDate, 
      endDate, 
      duration, 
      status, 
      email, 
      notes 
    } = req.body;

    // Validate required inputs
    if (!studentName || !verificationId || !documentType || !domain || !startDate || !endDate || !duration) {
      return res.status(400).json({ 
        success: false, 
        message: "Please fill in all required fields (Student Name, Verification ID, Document Type, Domain, Dates, Duration)." 
      });
    }

    verifications = readData(VERIFICATIONS_FILE);

    // Validate uniqueness of verification ID (case-insensitive)
    const trimmedId = verificationId.trim();
    const isDuplicate = verifications.some(
      v => (v.verificationId || "").trim().toLowerCase() === trimmedId.toLowerCase()
    );

    if (isDuplicate) {
      return res.status(400).json({ 
        success: false, 
        message: "This Verification ID already exists. Please use a unique ID." 
      });
    }

    const newRecord = {
      id: 'verif-' + Date.now().toString(),
      studentName: studentName.trim(),
      verificationId: trimmedId,
      documentType: documentType.trim(),
      internshipId: (internshipId || "").trim(),
      certificateId: (certificateId || "").trim(),
      domain: domain.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      duration: duration.trim(),
      status: status === "Revoked" ? "Revoked" : "Verified",
      email: (email || "").trim(),
      notes: (notes || "").trim(),
      issuedBy: "InfozaTech",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    verifications.unshift(newRecord);
    writeData(VERIFICATIONS_FILE, verifications);

    res.status(201).json({
      success: true,
      message: "Verification record added successfully",
      data: newRecord
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 12. PUT update verification record (Admin)
app.put('/api/verifications/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { 
      studentName, 
      verificationId, 
      documentType, 
      internshipId, 
      certificateId, 
      domain, 
      startDate, 
      endDate, 
      duration, 
      status, 
      email, 
      notes 
    } = req.body;

    verifications = readData(VERIFICATIONS_FILE);
    const index = verifications.findIndex(v => v.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Verification record not found"
      });
    }

    // Validate unique ID among other records
    if (verificationId) {
      const trimmedId = verificationId.trim();
      const isDuplicate = verifications.some(
        v => v.id !== id && (v.verificationId || "").trim().toLowerCase() === trimmedId.toLowerCase()
      );

      if (isDuplicate) {
        return res.status(400).json({
          success: false,
          message: "This Verification ID already exists. Please use a unique ID."
        });
      }
      verifications[index].verificationId = trimmedId;
    }

    if (studentName !== undefined) verifications[index].studentName = studentName.trim();
    if (documentType !== undefined) verifications[index].documentType = documentType.trim();
    if (internshipId !== undefined) verifications[index].internshipId = (internshipId || "").trim();
    if (certificateId !== undefined) verifications[index].certificateId = (certificateId || "").trim();
    if (domain !== undefined) verifications[index].domain = domain.trim();
    if (startDate !== undefined) verifications[index].startDate = startDate.trim();
    if (endDate !== undefined) verifications[index].endDate = endDate.trim();
    if (duration !== undefined) verifications[index].duration = duration.trim();
    if (status !== undefined) verifications[index].status = status === "Revoked" ? "Revoked" : "Verified";
    if (email !== undefined) verifications[index].email = (email || "").trim();
    if (notes !== undefined) verifications[index].notes = (notes || "").trim();
    verifications[index].updatedAt = new Date().toISOString();

    writeData(VERIFICATIONS_FILE, verifications);

    res.status(200).json({
      success: true,
      message: "Verification record updated successfully",
      data: verifications[index]
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 13. PATCH revoke verification record (Admin)
app.patch('/api/verifications/:id/revoke', (req, res) => {
  try {
    const { id } = req.params;
    verifications = readData(VERIFICATIONS_FILE);
    const index = verifications.findIndex(v => v.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Verification record not found"
      });
    }

    verifications[index].status = "Revoked";
    verifications[index].updatedAt = new Date().toISOString();
    writeData(VERIFICATIONS_FILE, verifications);

    res.status(200).json({
      success: true,
      message: "Verification record revoked successfully",
      data: verifications[index]
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 14. DELETE verification record (Admin)
app.delete('/api/verifications/:id', (req, res) => {
  try {
    const { id } = req.params;
    verifications = readData(VERIFICATIONS_FILE);
    const index = verifications.findIndex(v => v.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Verification record not found"
      });
    }

    verifications.splice(index, 1);
    writeData(VERIFICATIONS_FILE, verifications);

    res.status(200).json({
      success: true,
      message: "Verification record deleted successfully"
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// ============================================================================
// NOTES & FOLLOW-UPS API
// ============================================================================

// 1. GET ALL NOTES
app.get('/api/notes', (req, res) => {
  try {
    notes = readData(NOTES_FILE);
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 2. CREATE A NEW NOTE
app.post('/api/notes', (req, res) => {
  try {
    const { title, content, category, priority, color, followUp, pinned } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note title is required"
      });
    }

    notes = readData(NOTES_FILE);

    const newNote = {
      id: 'note-' + Date.now().toString(),
      title: title.trim(),
      content: (content || "").trim(),
      category: category || "General Reminder",
      priority: priority || "Medium",
      color: color || "indigo",
      followUp: (followUp || "").trim(),
      pinned: !!pinned,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // If pinned, insert at beginning, else after pinned notes
    if (newNote.pinned) {
      notes.unshift(newNote);
    } else {
      const firstUnpinnedIndex = notes.findIndex(n => !n.pinned);
      if (firstUnpinnedIndex === -1) {
        notes.push(newNote);
      } else {
        notes.splice(firstUnpinnedIndex, 0, newNote);
      }
    }

    writeData(NOTES_FILE, notes);

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 3. UPDATE A NOTE
app.put('/api/notes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, priority, color, followUp, pinned } = req.body;

    notes = readData(NOTES_FILE);
    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    if (title !== undefined) notes[index].title = title.trim();
    if (content !== undefined) notes[index].content = content.trim();
    if (category !== undefined) notes[index].category = category;
    if (priority !== undefined) notes[index].priority = priority;
    if (color !== undefined) notes[index].color = color;
    if (followUp !== undefined) notes[index].followUp = (followUp || "").trim();
    if (pinned !== undefined) notes[index].pinned = !!pinned;
    notes[index].updatedAt = new Date().toISOString();

    writeData(NOTES_FILE, notes);

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: notes[index]
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 4. TOGGLE PIN STATUS
app.patch('/api/notes/:id/pin', (req, res) => {
  try {
    const { id } = req.params;
    notes = readData(NOTES_FILE);
    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    notes[index].pinned = !notes[index].pinned;
    notes[index].updatedAt = new Date().toISOString();
    writeData(NOTES_FILE, notes);

    res.status(200).json({
      success: true,
      message: notes[index].pinned ? "Note pinned" : "Note unpinned",
      data: notes[index]
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// 5. DELETE A NOTE
app.delete('/api/notes/:id', (req, res) => {
  try {
    const { id } = req.params;
    notes = readData(NOTES_FILE);
    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    notes.splice(index, 1);
    writeData(NOTES_FILE, notes);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
});

// Serve static files from React frontend
const frontendDistPath = path.join(__dirname, '../frontend/dist');
const publicPath = path.join(__dirname, '../public');

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`👉 Test API at: http://localhost:${PORT}/api/test`);
  console.log(`👉 Contacts API: http://localhost:${PORT}/api/contacts`);
  console.log(`👉 Leads API: http://localhost:${PORT}/api/leads`);
  console.log(`========================================\n`);
});
