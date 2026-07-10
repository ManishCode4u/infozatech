const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting full production build process...');

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      copyDirSync(srcPath, destPath);
    } else {
      if (entry.name === '.env') continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to clear directory
function clearDirSync(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

try {
  // 1. Build Frontend
  console.log('📦 [1/3] Building frontend...');
  execSync('npm run build', {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=8192' }
  });
  console.log('✅ Frontend built successfully in frontend/dist');

  // 2. Sync to dist/public
  console.log('🧹 [2/3] Syncing frontend build to dist/public...');
  const distPublic = path.join(__dirname, 'dist', 'public');
  clearDirSync(distPublic);
  copyDirSync(path.join(__dirname, 'frontend', 'dist'), distPublic);
  console.log('✅ Frontend synced to dist/public');

  // 3. Sync backend files
  console.log('🔄 [3/3] Syncing backend source to dist/backend...');
  const distBackend = path.join(__dirname, 'dist', 'backend');
  clearDirSync(distBackend);
  copyDirSync(path.join(__dirname, 'backend'), distBackend);
  console.log('✅ Backend synced to dist/backend');

  console.log('\n🎉 Production build complete! All files ready in the "dist" folder.');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
