const Lead = require("../models/Lead"); // Assuming the path to your Mongoose model is correct

// Helper for consistent error response structure
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(message, error);
  res.status(statusCode).json({
    success: false,
    message: message,
    error: error ? error.message : null,
  });
};

// --- CRUD Operations ---

// 1. Get all leads (Read All)
const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to fetch leads", error);
  }
};

// 2. Get single lead by ID (Read One)
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    // This catches invalid ID format (CastError) or server errors
    sendErrorResponse(res, 500, "Failed to fetch lead", error);
  }
};

// 3. Create new lead (Create)
const createLead = async (req, res) => {
  try {
    const { name, email, company, message, status, remarks } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Check if lead with email already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Lead with this email already exists",
      });
    }

    const newLead = new Lead({
      name,
      email,
      company,
      message,
      // Default 'status' to 'new' if not provided
      status: status || "new",
      remarks,
    });

    const savedLead = await newLead.save();

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: savedLead,
    });
  } catch (error) {
    // Handles database/server errors
    sendErrorResponse(res, 500, "Failed to create lead", error);
  }
};

// 4. Update lead (Update)
const updateLead = async (req, res) => {
  try {
    // Using { new: true } to return the document after update
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body, // Pass the entire body, Mongoose ignores fields not in the schema
      { new: true, runValidators: true } // runValidators ensures schema validation is applied on update
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found for update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    // Catches invalid ID format, server errors, or validation errors (if runValidators is true)
    sendErrorResponse(res, 500, "Failed to update lead", error);
  }
};

// 5. Delete lead (Delete)
const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found for deletion",
      });
    }

    // 204 No Content is technically correct for a successful deletion with no body
    // but 200 OK with a success message is also very common and clear.
    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      data: {}, // Conventionally include an empty object or nothing
    });
  } catch (error) {
    // Catches invalid ID format or server errors
    sendErrorResponse(res, 500, "Failed to delete lead", error);
  }
};

// Export the primary functions
module.exports = {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
