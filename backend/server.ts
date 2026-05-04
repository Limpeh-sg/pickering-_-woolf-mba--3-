import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import formsRouter from './routes/forms.js';

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend server is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', formsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path,
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(NODE_ENV === 'development' && { error: err.message }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server started on http://localhost:${PORT}`);
  console.log(`📧 Outlook SMTP: ${process.env.SMTP_USER && process.env.SMTP_PASS ? '✅ Configured' : '⚠️  Not configured'}`);
  console.log(`🗃️  Database: ${process.env.LEADS_FILE || 'data/leads.jsonl'}`);
  console.log(`🔔 Lark webhook: ${process.env.LARK_WEBHOOK_URL ? '✅ Configured' : '⚠️  Not configured'}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔧 Environment: ${NODE_ENV}\n`);
});

process.on('SIGINT', () => {
  console.log('\n✋ Server stopping...');
  process.exit(0);
});
