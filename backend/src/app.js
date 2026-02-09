const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

/* Security */
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));

/* Rate Limiting */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  })
);

/* Body parsing — MUST be before routes */
app.use(express.json());

/* Routes */
const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);   // PUBLIC
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/inquiries', inquiryRoutes);  // mixed
app.use('/api/admin', adminRoutes);


/* Health check */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Impact You Academy API' });
});

module.exports = app;
