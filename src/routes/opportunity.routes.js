import express from 'express';
import {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity
} from '../controllers/opportunity.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();


// Wrap route chain with token extraction protection middleware
router.use(protect);

// Create a new opportunity
router.post('/opportunities', createOpportunity);

// Get all opportunities
router.get('/opportunities', getAllOpportunities);

// Get a single opportunity by ID
router.get('/opportunities:id', getOpportunityById);

// Update an opportunity by ID
router.put('/opportunities:id', updateOpportunity);

// Delete an opportunity by ID
router.delete('/opportunities:id', deleteOpportunity);

export default router;