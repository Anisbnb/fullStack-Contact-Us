const Lead = require("../models/Lead");

// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single lead
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update a lead
const updateLead = async (req, res) => {
  try {
    const { name, email, company, message, status, remarks } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, company, message, status, remarks },
      { new: true } // return updated document
    );

    if (!updatedLead) {
      return res
        .status(404)
        .json({ status: "error", message: "Lead not found" });
    }

    res.json({
      status: "success",
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

//  Delete a lead
const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead)
      return res.status(404).json({ message: "Lead not found" });

    res.json({
      status: "success",
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
