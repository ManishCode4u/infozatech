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
const { supabase, fromSupabaseRow, toSupabaseRow } = require('./supabase');

// File paths for persistence database
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');
const LEADS_FILE = path.join(__dirname, 'leads.json');
const APPLICATIONS_FILE = path.join(__dirname, 'applications.json');
const VERIFICATIONS_FILE = path.join(__dirname, 'verifications.json');
const NOTES_FILE = path.join(__dirname, 'notes.json');
const INTERNSHIP_SETTINGS_FILE = path.join(__dirname, 'internship_settings.json');

const DEFAULT_INTERNSHIP_SETTINGS = {
  applyUrl: "https://forms.gle/SjDCcUxkjRAGpDRx6",
  lastUpdated: new Date().toISOString()
};

// Helper to read object data from file
const readObjectData = (filePath, defaultData) => {
  try {
    if (!fs.existsSync(filePath)) {
      return defaultData;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '{}');
  } catch (error) {
    console.error(`Error reading from ${filePath}:`, error);
    return defaultData;
  }
};

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
let internshipSettings = readObjectData(INTERNSHIP_SETTINGS_FILE, DEFAULT_INTERNSHIP_SETTINGS);

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
});

// 9. GET all verification records (Admin)
app.get('/api/verifications', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('verification_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase get all verifications error:", error);
        return res.status(500).json({ 
          success: false, 
          message: "Database error fetching verification records: " + error.message,
          data: []
        });
      }

      const formatted = (data || []).map(fromSupabaseRow);
      return res.status(200).json({
        success: true,
        count: formatted.length,
        data: formatted
      });
    }

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
app.get('/api/verifications/verify/:verificationId', async (req, res) => {
  try {
    const rawId = req.params.verificationId || "";
    const cleanId = rawId.trim();

    if (!cleanId) {
      return res.status(400).json({
        success: false,
        found: false,
        message: "Please enter a valid Verification ID"
      });
    }

    let record = null;

    if (supabase) {
      // Case-insensitive lookup against verification_id in Supabase
      const { data, error } = await supabase
        .from('verification_records')
        .select('*')
        .ilike('verification_id', cleanId)
        .limit(1);

      if (error) {
        console.error("Supabase public verification query error:", error);
        return res.status(500).json({ 
          success: false, 
          found: false,
          message: "Verification service temporarily unavailable. Please try again." 
        });
      }

      if (data && data.length > 0) {
        record = fromSupabaseRow(data[0]);
      }
    } else {
      verifications = readData(VERIFICATIONS_FILE);
      record = verifications.find(v => 
        (v.verificationId && v.verificationId.trim().toLowerCase() === cleanId.toLowerCase()) ||
        (v.certificateId && v.certificateId.trim().toLowerCase() === cleanId.toLowerCase()) ||
        (v.internshipId && v.internshipId.trim().toLowerCase() === cleanId.toLowerCase())
      );
    }

    if (!record) {
      return res.status(404).json({
        success: false,
        found: false,
        message: "We could not find a valid document associated with this Verification ID."
      });
    }

    // Public sanitized payload (CRITICAL: NEVER expose email, notes, database IDs, credentials, or internal information)
    const publicDoc = {
      studentName: record.studentName,
      verificationId: record.verificationId,
      documentType: record.documentType,
      domain: record.domain,
      startDate: record.startDate,
      endDate: record.endDate,
      duration: record.duration,
      status: record.status || "Verified",
      issuedBy: record.issuedBy || "InfozaTech",
      certificateId: record.certificateId || record.verificationId || "",
      internshipId: record.internshipId || ""
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
app.post('/api/verifications', async (req, res) => {
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

    const trimmedId = verificationId.trim();

    if (supabase) {
      // 1. Check for duplicate verification_id (case-insensitive) in Supabase
      const { data: existing, error: searchError } = await supabase
        .from('verification_records')
        .select('id, verification_id')
        .ilike('verification_id', trimmedId)
        .limit(1);

      if (searchError) {
        console.error("Supabase duplicate check error:", searchError);
      }

      if (existing && existing.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: "This Verification ID already exists. Please use a unique ID." 
        });
      }

      const rowToInsert = toSupabaseRow({
        studentName, 
        verificationId: trimmedId, 
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
      });

      const { data, error: insertError } = await supabase
        .from('verification_records')
        .insert([rowToInsert])
        .select()
        .single();

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        if (insertError.code === '23505' || (insertError.message && insertError.message.includes('unique'))) {
          return res.status(400).json({ 
            success: false, 
            message: "This Verification ID already exists. Please use a unique ID." 
          });
        }
        return res.status(500).json({ 
          success: false, 
          message: "Database error creating verification record: " + insertError.message 
        });
      }

      return res.status(201).json({
        success: true,
        message: "Verification record added successfully",
        data: fromSupabaseRow(data)
      });
    }

    // Fallback if supabase not configured
    verifications = readData(VERIFICATIONS_FILE);

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

// 11b. POST Bulk upload verification records (Admin)
app.post('/api/verifications/bulk', async (req, res) => {
  try {
    const { verifications: rawRecords } = req.body;

    if (!Array.isArray(rawRecords) || rawRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No verification records provided. Please upload a valid list."
      });
    }

    let addedCount = 0;
    let updatedCount = 0;
    const errors = [];
    const validRecords = [];

    // Filter & Validate
    for (let i = 0; i < rawRecords.length; i++) {
      const item = rawRecords[i];
      const studentName = (item.studentName || item.name || "").trim();
      const verificationId = (item.verificationId || item.certificateId || item.code || item.certificationNo || "").trim();
      const domain = (item.domain || item.stream || item.course || "Web Development").trim();
      const duration = (item.duration || "4 Weeks").trim();
      const startDate = (item.startDate || item.startingDate || "").trim();
      const endDate = (item.endDate || item.awardDate || item.completionDate || "").trim();
      const documentType = (item.documentType || "Internship Certificate").trim();
      const status = (item.status === "Revoked" ? "Revoked" : "Verified");
      const email = (item.email || "").trim();
      const notes = (item.notes || "").trim();

      if (!studentName || !verificationId) {
        errors.push(`Row ${i + 1}: Missing Student Name or Verification ID.`);
        continue;
      }

      validRecords.push({
        studentName,
        verificationId,
        documentType,
        internshipId: (item.internshipId || verificationId).trim(),
        certificateId: (item.certificateId || verificationId).trim(),
        domain,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date().toISOString().split('T')[0],
        duration,
        status,
        email,
        notes,
        issuedBy: (item.issuedBy || "InfozaTech").trim()
      });
    }

    if (validRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid student records found in file. Please ensure 'Certification No' and 'Student Name' are provided.",
        errors
      });
    }

    if (supabase) {
      for (const rec of validRecords) {
        const { data: existing } = await supabase
          .from('verification_records')
          .select('id')
          .ilike('verification_id', rec.verificationId)
          .limit(1);

        if (existing && existing.length > 0) {
          const rowToUpdate = toSupabaseRow(rec, true);
          await supabase
            .from('verification_records')
            .update(rowToUpdate)
            .eq('id', existing[0].id);
          updatedCount++;
        } else {
          const rowToInsert = toSupabaseRow(rec);
          await supabase
            .from('verification_records')
            .insert([rowToInsert]);
          addedCount++;
        }
      }
    } else {
      verifications = readData(VERIFICATIONS_FILE);

      for (const rec of validRecords) {
        const index = verifications.findIndex(
          v => (v.verificationId || "").trim().toLowerCase() === rec.verificationId.toLowerCase()
        );

        if (index !== -1) {
          verifications[index] = {
            ...verifications[index],
            ...rec,
            updatedAt: new Date().toISOString()
          };
          updatedCount++;
        } else {
          const newRecord = {
            id: 'verif-' + Date.now().toString() + '-' + Math.random().toString(36).substr(2, 6),
            ...rec,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          verifications.unshift(newRecord);
          addedCount++;
        }
      }

      writeData(VERIFICATIONS_FILE, verifications);
    }

    return res.status(200).json({
      success: true,
      message: `Successfully processed ${validRecords.length} records (${addedCount} added, ${updatedCount} updated).`,
      added: addedCount,
      updated: updatedCount,
      totalProcessed: validRecords.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error("Bulk Upload Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during bulk upload"
    });
  }
});

// 12. PUT update verification record (Admin)
app.put('/api/verifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    if (supabase) {
      // If verificationId is being updated, verify uniqueness
      if (updatePayload.verificationId) {
        const trimmedId = updatePayload.verificationId.trim();
        const { data: existing, error: searchError } = await supabase
          .from('verification_records')
          .select('id, verification_id')
          .ilike('verification_id', trimmedId)
          .neq('id', id);

        if (existing && existing.length > 0) {
          return res.status(400).json({
            success: false,
            message: "This Verification ID already exists. Please use a unique ID."
          });
        }
      }

      const rowToUpdate = toSupabaseRow(updatePayload, true);

      const { data, error: updateError } = await supabase
        .from('verification_records')
        .update(rowToUpdate)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error("Supabase update error:", updateError);
        if (updateError.code === '23505') {
          return res.status(400).json({
            success: false,
            message: "This Verification ID already exists. Please use a unique ID."
          });
        }
        return res.status(500).json({
          success: false,
          message: "Database error updating record: " + updateError.message
        });
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Verification record not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Verification record updated successfully",
        data: fromSupabaseRow(data)
      });
    }

    // Fallback
    verifications = readData(VERIFICATIONS_FILE);
    const index = verifications.findIndex(v => v.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Verification record not found"
      });
    }

    if (updatePayload.verificationId) {
      const trimmedId = updatePayload.verificationId.trim();
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

    if (updatePayload.studentName !== undefined) verifications[index].studentName = updatePayload.studentName.trim();
    if (updatePayload.documentType !== undefined) verifications[index].documentType = updatePayload.documentType.trim();
    if (updatePayload.internshipId !== undefined) verifications[index].internshipId = (updatePayload.internshipId || "").trim();
    if (updatePayload.certificateId !== undefined) verifications[index].certificateId = (updatePayload.certificateId || "").trim();
    if (updatePayload.domain !== undefined) verifications[index].domain = updatePayload.domain.trim();
    if (updatePayload.startDate !== undefined) verifications[index].startDate = updatePayload.startDate.trim();
    if (updatePayload.endDate !== undefined) verifications[index].endDate = updatePayload.endDate.trim();
    if (updatePayload.duration !== undefined) verifications[index].duration = updatePayload.duration.trim();
    if (updatePayload.status !== undefined) verifications[index].status = updatePayload.status === "Revoked" ? "Revoked" : "Verified";
    if (updatePayload.email !== undefined) verifications[index].email = (updatePayload.email || "").trim();
    if (updatePayload.notes !== undefined) verifications[index].notes = (updatePayload.notes || "").trim();
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
app.patch('/api/verifications/:id/revoke', async (req, res) => {
  try {
    const { id } = req.params;

    if (supabase) {
      const { data, error } = await supabase
        .from('verification_records')
        .update({ status: 'Revoked', updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Supabase revoke error:", error);
        return res.status(500).json({
          success: false,
          message: "Database error revoking record: " + error.message
        });
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Verification record not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Verification record revoked successfully",
        data: fromSupabaseRow(data)
      });
    }

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
app.delete('/api/verifications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (supabase) {
      const { error } = await supabase
        .from('verification_records')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Supabase delete error:", error);
        return res.status(500).json({
          success: false,
          message: "Database error deleting record: " + error.message
        });
      }

      return res.status(200).json({
        success: true,
        message: "Verification record deleted successfully"
      });
    }

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

// ============================================================================
// INTERNSHIP & BATCH SETTINGS API
// ============================================================================

// 1. GET Internship Settings (Public endpoint)
app.get('/api/settings/internship', (req, res) => {
  try {
    internshipSettings = readObjectData(INTERNSHIP_SETTINGS_FILE, DEFAULT_INTERNSHIP_SETTINGS);
    res.status(200).json({
      success: true,
      data: {
        ...DEFAULT_INTERNSHIP_SETTINGS,
        ...internshipSettings
      }
    });
  } catch (error) {
    console.error("Error getting internship settings:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: DEFAULT_INTERNSHIP_SETTINGS
    });
  }
});

// 2. UPDATE / SAVE Internship Apply Link (Admin)
const handleUpdateInternshipSettings = (req, res) => {
  try {
    const { applyUrl } = req.body;

    if (!applyUrl || !applyUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: "Internship Apply URL is required"
      });
    }

    const updatedSettings = {
      applyUrl: applyUrl.trim(),
      lastUpdated: new Date().toISOString()
    };

    internshipSettings = updatedSettings;
    writeData(INTERNSHIP_SETTINGS_FILE, updatedSettings);

    res.status(200).json({
      success: true,
      message: "Internship apply link updated successfully",
      data: updatedSettings
    });
  } catch (error) {
    console.error("Error updating internship settings:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

app.put('/api/settings/internship', handleUpdateInternshipSettings);
app.post('/api/settings/internship', handleUpdateInternshipSettings);

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

// Export Express app for Vercel Serverless Function and testing
module.exports = app;

// Start server if run directly (Local development)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`👉 Test API at: http://localhost:${PORT}/api/test`);
    console.log(`👉 Contacts API: http://localhost:${PORT}/api/contacts`);
    console.log(`👉 Leads API: http://localhost:${PORT}/api/leads`);
    console.log(`👉 Verifications API: http://localhost:${PORT}/api/verifications`);
    console.log(`========================================\n`);
  });
}
