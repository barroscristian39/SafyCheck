import { query } from '../config/database';
import { Company } from '../types';

export async function createCompany(
  name: string,
  cnpj: string,
  address?: string,
  phone?: string
): Promise<Company> {
  const result = await query(
    `INSERT INTO companies (name, cnpj, address, phone)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, cnpj, address, phone, created_at, updated_at`,
    [name, cnpj, address, phone]
  );

  return result.rows[0];
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const result = await query(
    `SELECT id, name, cnpj, address, phone, created_at, updated_at
     FROM companies WHERE id = $1`,
    [id]
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function getAllCompanies(): Promise<Company[]> {
  const result = await query(
    `SELECT id, name, cnpj, address, phone, created_at, updated_at
     FROM companies ORDER BY created_at DESC`
  );

  return result.rows;
}

export async function updateCompany(
  id: string,
  name?: string,
  address?: string,
  phone?: string
): Promise<Company | null> {
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
  if (phone !== undefined) {
    updates.push(`phone = $${paramCount++}`);
    values.push(phone);
  }

  if (updates.length === 0) return getCompanyById(id);

  const result = await query(
    `UPDATE companies SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING id, name, cnpj, address, phone, created_at, updated_at`,
    values
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function deleteCompany(id: string): Promise<boolean> {
  const result = await query(`DELETE FROM companies WHERE id = $1`, [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}
