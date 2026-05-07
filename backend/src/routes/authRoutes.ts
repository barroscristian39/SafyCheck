import { Router, Request, Response } from 'express';
import { registerUser, loginUser, findUserById } from '../services/authService';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, company_id } = req.body;

    if (!email || !password || !name || !company_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { user, token } = await registerUser(email, password, name, company_id);
    res.status(201).json({ user, token });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    res.status(400).json({ error: message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const { user, token } = await loginUser(email, password);
    res.json({ user, token });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({ error: message });
  }
});

router.get('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch user';
    res.status(500).json({ error: message });
  }
});

export default router;
