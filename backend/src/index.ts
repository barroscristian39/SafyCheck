import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { runMigrations } from './utils/runMigrations';
import authRoutes from './routes/authRoutes';
import companyRoutes from './routes/companyRoutes';
import unitRoutes from './routes/unitRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/units', unitRoutes);

// Start server
async function start() {
  try {
    await runMigrations();

    app.listen(PORT, () => {
      console.log(`🚀 SafeCheck API running on http://localhost:${PORT}`);
      console.log(`📊 Database connected to Neon`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;
