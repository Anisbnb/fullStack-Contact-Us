const Admin = require("../models/admin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRE } = process.env;

// const clientRegister = async (req, res) => {
//   try {
//     const { name, lname, email, password, phone, age, gender, address } =
//       req.body;

//     // Check if user already exists
//     const existingUser = await Client.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new client
//     const newClient = new Client({
//       name,
//       lname,
//       email,
//       password: hashedPassword,
//       phone,
//       age,
//       gender,
//       address,
//     });

//     // Save the client
//     await newClient.save();

//     res.status(201).json({
//       message: "Registration successful",
//       user: {
//         id: newClient._id,
//         name: newClient.name,
//         email: newClient.email,
//       },
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       message: "Registration failed",
//       error: error.message,
//     });
//   }
// };

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password);
    console.log(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
  
};

module.exports = { adminLogin };