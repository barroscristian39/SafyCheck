import fs from 'fs';
import path from 'path';
import { query } from '../config/database';

export async function runMigrations() {
  try {
    console.log('Running migrations...');

    const migrationPath = path.join(__dirname, '../migrations/001_initial_schema.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    await query(migrationSQL);

    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  }
}
