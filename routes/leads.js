const express = require("express");
const {
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadControllers");

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
