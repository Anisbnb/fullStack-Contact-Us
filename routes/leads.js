const express = require('express');
const router = express.Router();
const {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
} = require('../controllers/leadControllers');

// Lead routes

// GET /api/leads - Get all leads
router.get('/leads', getAllLeads);

// POST /api/leads - Create a new lead
router.post('/leads', createLead);

// GET /api/leads/:id - Get a specific lead
router.get('/leads/:id', getLeadById);

// PUT /api/leads/:id - Update a lead
router.put('/leads/:id', updateLead);

// DELETE /api/leads/:id - Delete a lead
router.delete('/leads/:id', deleteLead);

module.exports = router;
