const express = require("express");
const {
  getAllLeads, // Corrected from getLeads
  getLeadById,
  createLead, // Added the function for POST
  updateLead,
  deleteLead,
} = require("../controllers/leadControllers"); // Assuming correct path

const router = express.Router();

// --- Lead Routes ---

// GET /api/leads/
router.get("/", getAllLeads);

// POST /api/leads/
router.post("/", createLead); // Route for creating a new lead

// GET /api/leads/:id
router.get("/:id", getLeadById);

// PUT /api/leads/:id
router.put("/:id", updateLead);

// DELETE /api/leads/:id
router.delete("/:id", deleteLead);

module.exports = router;
