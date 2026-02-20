#!/usr/bin/env node

/**
 * Validation script for i18n configuration
 * Prevents ENOENT errors by ensuring all locale files exist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.join(__dirname, '..', 'i18n', 'locales');
const REQUIRED_LOCALES = ['en.json', 'ar.json'];

console.log('🔍 Validating i18n configuration...\n');

// Check if locales directory exists
if (!fs.existsSync(LOCALES_DIR)) {
  console.error('❌ Error: locales directory not found at:', LOCALES_DIR);
  process.exit(1);
}

console.log('✓ Locales directory exists');

// Check each required locale file
let allValid = true;
const missingFiles = [];

REQUIRED_LOCALES.forEach(file => {
  const filePath = path.join(LOCALES_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing: ${file}`);
    missingFiles.push(file);
    allValid = false;
  } else {
    // Validate JSON
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      console.log(`✓ ${file} exists and is valid JSON`);
    } catch (error) {
      console.error(`❌ ${file} has invalid JSON:`, error.message);
      allValid = false;
    }
  }
});

// Validate nuxt.config.ts references
try {
  const configPath = path.join(__dirname, '..', 'nuxt.config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  REQUIRED_LOCALES.forEach(file => {
    const localeCode = file.replace('.json', '');
    if (!configContent.includes(`file: '${file}'`) && !configContent.includes(`file: "${file}"`)) {
      console.warn(`⚠️  Warning: ${file} not referenced in nuxt.config.ts`);
    }
  });
  
  console.log('✓ nuxt.config.ts references validated');
} catch (error) {
  console.warn('⚠️  Could not validate nuxt.config.ts:', error.message);
}

if (!allValid) {
  console.error('\n❌ Validation failed. Missing files:', missingFiles.join(', '));
  console.error('\nPlease ensure all locale files exist before running the application.');
  process.exit(1);
}

console.log('\n✅ All i18n configuration validated successfully!');
