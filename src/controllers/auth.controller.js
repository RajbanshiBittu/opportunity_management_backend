import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user workspace account
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Structural request validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false, 
        message: 'Please provide all required registration fields' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password security footprint must be at least 6 characters long'
      });
    }

    // 2. Identity duplication check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user account with that email already exists' 
      });
    }

    // 3. Cryptographic salt & hash phase
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Document instantiation & persistence commit
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword 
    });

    await newUser.save();
    console.log("Successfully wrote to DB:", newUser);

    // 5. Build signing authorization state
    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // 6. Balanced transaction dispatch mapping frontend expectations
    return res.status(201).json({
      success: true,
      token,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      message: `User Registered Successfully`
    });
  } catch (error) {
    console.error(`Signup error:`, error);
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user credentials & issue JWT token
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and Password are required'
      });
    }

    // Pull document safely checking explicitly if schema configuration requires password exclusion override
    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify hash signatures match
    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Establish authentication session payload parameters
    const token = jwt.sign(
      { userId: existingUser._id, name: existingUser.name, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Return complete payload object matching React AuthContext structure
    return res.status(200).json({
      success: true,
      token,
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      message: `User login Successful`
    });

  } catch (error) {
    console.error(`Login error:`, error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Validate current user state using auth middleware payload
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized token context context breakdown" 
      });
    }

    // Normalize structural mapping back to React runtime state loop
    return res.json({
      _id: req.user.userId || req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  } catch (error) {
    console.error('getMe error:', error);
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    });
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Clear active session context
 * @access  Private
 */
export const logout = async (req, res, next) => {
  try {
    return res.status(200).json({ 
      success: true, 
      message: `Logout successful` 
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    });
  }
};