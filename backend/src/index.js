import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import eventsRoutes from './routes/events.routes.js';
import suggestionsRoutes from './routes/suggestions.routes.js';
import departmentsRoutes from './routes/departments.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/events', eventsRoutes);
app.use('/suggestions', suggestionsRoutes);
app.use('/departments', departmentsRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`uni-planner-backend listening on :${port}`));
