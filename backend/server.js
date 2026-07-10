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
