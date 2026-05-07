import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  company_id: string
): Promise<{ user: User; token: string }> {
  const hashedPassword = await hashPassword(password);

  const result = await query(
    `INSERT INTO users (email, password, name, company_id, role)
     VALUES ($1, $2, $3, $4, 'inspector')
     RETURNING id, email, name, company_id, role, created_at, updated_at`,
    [email, hashedPassword, name, company_id]
  );

  const user = result.rows[0] as User;
  const token = generateToken(user);

  return { user, token };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const result = await query(
    `SELECT id, email, password, name, avatar, role, company_id, created_at, updated_at
     FROM users WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  const user = result.rows[0];
  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user);
  delete user.password;

  return { user, token };
}

export async function findUserById(id: string): Promise<User | null> {
  const result = await query(
    `SELECT id, email, name, avatar, role, company_id, created_at, updated_at
     FROM users WHERE id = $1`,
    [id]
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await query(
    `SELECT id, email, name, avatar, role, company_id, created_at, updated_at
     FROM users WHERE email = $1`,
    [email]
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}
