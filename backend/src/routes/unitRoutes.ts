import { Router, Request, Response } from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import {
  createUnit,
  getUnitById,
  getUnitsByCompany,
  updateUnit,
  deleteUnit,
} from '../services/unitService';

const router = Router();

// Create unit
router.post('/', authenticateToken, authorize('admin', 'inspector'), async (req: Request, res: Response) => {
  try {
    const { company_id, name, address, latitude, longitude } = req.body;

    if (!company_id || !name || !address) {
      return res.status(400).json({ error: 'Company ID, name, and address required' });
    }

    const unit = await createUnit(company_id, name, address, latitude, longitude);
    res.status(201).json(unit);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create unit';
    res.status(400).json({ error: message });
  }
});

// Get units by company
router.get('/company/:company_id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const units = await getUnitsByCompany(req.params.company_id);
    res.json(units);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch units';
    res.status(500).json({ error: message });
  }
});

// Get unit by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const unit = await getUnitById(req.params.id);

    if (!unit) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    res.json(unit);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch unit';
    res.status(500).json({ error: message });
  }
});

// Update unit
router.patch('/:id', authenticateToken, authorize('admin', 'inspector'), async (req: Request, res: Response) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const unit = await updateUnit(req.params.id, name, address, latitude, longitude);

    if (!unit) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    res.json(unit);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update unit';
    res.status(400).json({ error: message });
  }
});

// Delete unit
router.delete('/:id', authenticateToken, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const success = await deleteUnit(req.params.id);

    if (!success) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    res.json({ message: 'Unit deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete unit';
    res.status(500).json({ error: message });
  }
});

export default router;
