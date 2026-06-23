import express from "express";
import dotenv from "dotenv";
import cors from  "cors";
import connectDB from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
import opportunityRoutes from './routes/opportunity.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const application = express();

connectDB();

const PORT = process.env.PORT;

application.use(cors());
application.use(express.json());

// Mount routes
application.use('/api/auth', authRoutes);
application.use('/api', opportunityRoutes);

// Fallback Route for Undefined API endpoints
// application.use('*', (req, res) => {
//   return res.status(404).json({ error: 'API endpoint not found', message: error.message});
// });

application.use(errorHandler);


application.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})