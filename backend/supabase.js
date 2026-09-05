require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

let supabase = null;

if (supabaseUrl && supabaseServiceKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    console.log('✅ Supabase client connected successfully to PostgreSQL database.');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.warn('⚠️ Supabase credentials missing. Please define SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment variables.');
}

/**
 * Maps database row (snake_case from PostgreSQL) to frontend camelCase format
 * Exact PostgreSQL Columns:
 * id (bigint), verification_id, student_name, document_type, internship_id, certificate_id,
 * domain, start_date, end_date, duration, status, email, notes, created_at, updated_at
 */
const fromSupabaseRow = (row) => {
  if (!row) return null;
  return {
    id: String(row.id || ''),
    studentName: row.student_name || row.studentName || '',
    verificationId: row.verification_id || row.verificationId || '',
    documentType: row.document_type || row.documentType || 'Internship Certificate',
    internshipId: row.internship_id || row.internshipId || '',
    certificateId: row.certificate_id || row.certificateId || '',
    domain: row.domain || '',
    startDate: row.start_date || row.startDate || '',
    endDate: row.end_date || row.endDate || '',
    duration: row.duration || '',
    status: row.status || 'Verified',
    email: row.email || '',
    notes: row.notes || '',
    issuedBy: 'InfozaTech',
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString()
  };
};

/**
 * Maps incoming request data to exact Supabase PostgreSQL columns (snake_case)
 */
const toSupabaseRow = (data, isUpdate = false) => {
  const row = {};

  if (data.studentName !== undefined || data.student_name !== undefined) {
    row.student_name = (data.studentName || data.student_name || '').trim();
  }
  if (data.verificationId !== undefined || data.verification_id !== undefined) {
    row.verification_id = (data.verificationId || data.verification_id || '').trim();
  }
  if (data.documentType !== undefined || data.document_type !== undefined) {
    row.document_type = (data.documentType || data.document_type || 'Internship Certificate').trim();
  }
  if (data.domain !== undefined) {
    row.domain = (data.domain || '').trim();
  }
  if (data.startDate !== undefined || data.start_date !== undefined) {
    row.start_date = (data.startDate || data.start_date || '').trim();
  }
  if (data.endDate !== undefined || data.end_date !== undefined) {
    row.end_date = (data.endDate || data.end_date || '').trim();
  }
  if (data.duration !== undefined) {
    row.duration = (data.duration || '').trim();
  }
  if (data.status !== undefined) {
    row.status = data.status === 'Revoked' ? 'Revoked' : 'Verified';
  }
  if (data.email !== undefined) {
    row.email = (data.email || '').trim();
  }
  if (data.notes !== undefined) {
    row.notes = (data.notes || '').trim();
  }
  if (data.internshipId !== undefined || data.internship_id !== undefined) {
    row.internship_id = (data.internshipId || data.internship_id || '').trim();
  }
  if (data.certificateId !== undefined || data.certificate_id !== undefined) {
    row.certificate_id = (data.certificateId || data.certificate_id || '').trim();
  }

  row.updated_at = new Date().toISOString();
  if (!isUpdate) {
    row.created_at = new Date().toISOString();
  }

  return row;
};

module.exports = {
  supabase,
  fromSupabaseRow,
  toSupabaseRow,
  isSupabaseConfigured: () => !!supabase
};
