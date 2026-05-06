import { Router, Request, Response } from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import {
  createCompany,
  getCompanyById,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from '../services/companyService';

const router = Router();

// Create company (admin only)
router.post('/', authenticateToken, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { name, cnpj, address, phone } = req.body;

    if (!name || !cnpj) {
      return res.status(400).json({ error: 'Name and CNPJ required' });
    }

    const company = await createCompany(name, cnpj, address, phone);
    res.status(201).json(company);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create company';
    res.status(400).json({ error: message });
  }
});

// Get all companies
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch companies';
    res.status(500).json({ error: message });
  }
});

// Get company by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const company = await getCompanyById(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch company';
    res.status(500).json({ error: message });
  }
});

// Update company
router.patch('/:id', authenticateToken, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;
    const company = await updateCompany(req.params.id, name, address, phone);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update company';
    res.status(400).json({ error: message });
  }
});

// Delete company
router.delete('/:id', authenticateToken, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const success = await deleteCompany(req.params.id);

    if (!success) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete company';
    res.status(500).json({ error: message });
  }
});

export default router;
