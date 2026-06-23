import express from 'express';
import { register, login, getMe, logout } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout)

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CEOFactory Backend API is running'
  });
});

export default router;