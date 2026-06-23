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

application.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
}));

// Mount routes
application.use('/api/auth', authRoutes);
application.use('/api', opportunityRoutes);

application.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CEOFactory Backend API is running'
  });
});

application.use(errorHandler);


application.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})