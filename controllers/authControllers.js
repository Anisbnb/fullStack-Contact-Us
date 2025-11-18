const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// It's assumed that process.env is configured to load environment variables
// This destructuring is correct for accessing environment variables.
const { JWT_SECRET, JWT_EXPIRE } = process.env;

// --- Helper Function ---

/**
 * Generates a JWT token for the given user payload.
 * @param {object} payload - The data to include in the token (e.g., id, email).
 * @returns {string} The signed JWT token.
 */
const generateToken = (payload) => {
  // Use JWT_EXPIRE from process.env, defaulting to '1h' if not set
  const expiresIn = JWT_EXPIRE || "1h";
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// --- Controller Functions ---

/**
 * Registers a new Admin user.
 * POST /api/admin/register
 */
const adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin email already registered",
      });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      // You can add other admin-specific fields here (e.g., name, role)
    });

    await newAdmin.save();

    // 5. Generate Token and send response
    const payload = { id: newAdmin._id, email: newAdmin.email };
    const token = generateToken(payload);

    res.status(201).json({
      success: true,
      message: "Admin registration successful",
      token,
      user: {
        id: newAdmin._id,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({
      success: false,
      message: "Admin registration failed",
      error: error.message,
    });
  }
};

/**
 * Logs in an existing Admin user.
 * POST /api/admin/login
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (User not found)",
      });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (Password mismatch)",
      });
    }

    // 4. Create JWT token
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = generateToken(payload);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        // Add other user fields like role/name if they exist in your model
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// --- Exports ---
module.exports = {
  adminRegister,
  adminLogin,
};
