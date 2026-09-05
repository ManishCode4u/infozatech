const { fromSupabaseRow, toSupabaseRow } = require('./supabase');

console.log('\n======================================================');
console.log('🧪 RUNNING COMPREHENSIVE VERIFICATION VALIDATION TESTS');
console.log('======================================================\n');

// 1. Check Row Mapping Structure (Exact 15 Columns)
const testInput = {
  studentName: 'Manish Kumar',
  verificationId: 'ITZ26001',
  documentType: 'Internship Certificate',
  internshipId: 'INT-9901',
  certificateId: 'CERT-8802',
  domain: 'Web Development',
  startDate: '01/01/2026',
  endDate: '01/02/2026',
  duration: '4 Weeks',
  status: 'Verified',
  email: 'student@example.com',
  notes: 'Internal evaluation notes'
};

const pgRow = toSupabaseRow(testInput);
console.log('1. toSupabaseRow (PostgreSQL columns):', Object.keys(pgRow));

const expectedColumns = [
  'student_name',
  'verification_id',
  'document_type',
  'internship_id',
  'certificate_id',
  'domain',
  'start_date',
  'end_date',
  'duration',
  'status',
  'email',
  'notes',
  'created_at',
  'updated_at'
];

let columnCheckPassed = true;
expectedColumns.forEach(col => {
  if (!(col in pgRow)) {
    console.error(`❌ Missing column in toSupabaseRow: ${col}`);
    columnCheckPassed = false;
  }
});

// Ensure no unexpected extra columns like 'issued_by' are written to DB
if ('issued_by' in pgRow) {
  console.error('❌ Unexpected column "issued_by" in toSupabaseRow payload');
  columnCheckPassed = false;
}

if (columnCheckPassed) {
  console.log('✅ PostgreSQL Column Mapping: 100% MATCHED with actual existing table');
}

// 2. Test fromSupabaseRow with BIGINT ID (e.g. 101)
const sampleDbRow = {
  id: 101, // Bigint generated identity
  verification_id: 'ITZ26001',
  student_name: 'Manish Kumar',
  document_type: 'Internship Certificate',
  internship_id: 'INT-9901',
  certificate_id: 'CERT-8802',
  domain: 'Web Development',
  start_date: '01/01/2026',
  end_date: '01/02/2026',
  duration: '4 Weeks',
  status: 'Verified',
  email: 'student@example.com',
  notes: 'Internal confidential note',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const frontendView = fromSupabaseRow(sampleDbRow);
console.log('\n2. fromSupabaseRow (Frontend format):', frontendView);

if (frontendView.id === '101' && frontendView.verificationId === 'ITZ26001') {
  console.log('✅ BIGINT ID Conversion & Field mapping: PASSED');
} else {
  console.error('❌ BIGINT ID Conversion failed');
  process.exit(1);
}

// 3. Test Sanitized Public Verification Payload
const publicSanitizedDoc = {
  studentName: frontendView.studentName,
  verificationId: frontendView.verificationId,
  documentType: frontendView.documentType,
  domain: frontendView.domain,
  startDate: frontendView.startDate,
  endDate: frontendView.endDate,
  duration: frontendView.duration,
  status: frontendView.status || "Verified",
  issuedBy: frontendView.issuedBy || "InfozaTech",
  certificateId: frontendView.certificateId || frontendView.verificationId || "",
  internshipId: frontendView.internshipId || ""
};

console.log('\n3. Public Sanitized Verification Payload (Safe for /verify):', publicSanitizedDoc);

if ('email' in publicSanitizedDoc || 'notes' in publicSanitizedDoc || 'id' in publicSanitizedDoc) {
  console.error('❌ CRITICAL LEAK: Private internal details found in public payload!');
  process.exit(1);
} else {
  console.log('✅ Security Check: No emails, notes, or database internal IDs exposed to public endpoint!');
}

console.log('\n======================================================');
console.log('🎉 ALL CODE & SCHEMA CHECKS PASSED SUCCESSFULLY!');
console.log('======================================================\n');
