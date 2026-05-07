import { query } from '../config/database';
import { Unit } from '../types';

export async function createUnit(
  company_id: string,
  name: string,
  address: string,
  latitude?: number,
  longitude?: number
): Promise<Unit> {
  const result = await query(
    `INSERT INTO units (company_id, name, address, latitude, longitude)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, company_id, name, address, latitude, longitude, created_at, updated_at`,
    [company_id, name, address, latitude, longitude]
  );

  return result.rows[0];
}

export async function getUnitById(id: string): Promise<Unit | null> {
  const result = await query(
    `SELECT id, company_id, name, address, latitude, longitude, created_at, updated_at
     FROM units WHERE id = $1`,
    [id]
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function getUnitsByCompany(company_id: string): Promise<Unit[]> {
  const result = await query(
    `SELECT id, company_id, name, address, latitude, longitude, created_at, updated_at
     FROM units WHERE company_id = $1 ORDER BY created_at DESC`,
    [company_id]
  );

  return result.rows;
}

export async function updateUnit(
  id: string,
  name?: string,
  address?: string,
  latitude?: number,
  longitude?: number
): Promise<Unit | null> {
  const updates: string[] = [];
  const values: unknown[] = [id];
  let paramCount = 2;

  if (name !== undefined) {
    updates.push(`name = $${paramCount++}`);
    values.push(name);
  }
  if (address !== undefined) {
    updates.push(`address = $${paramCount++}`);
    values.push(address);
  }
  if (latitude !== undefined) {
    updates.push(`latitude = $${paramCount++}`);
    values.push(latitude);
  }
  if (longitude !== undefined) {
    updates.push(`longitude = $${paramCount++}`);
    values.push(longitude);
  }

  if (updates.length === 0) return getUnitById(id);

  const result = await query(
    `UPDATE units SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING id, company_id, name, address, latitude, longitude, created_at, updated_at`,
    values
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function deleteUnit(id: string): Promise<boolean> {
  const result = await query(`DELETE FROM units WHERE id = $1`, [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}
