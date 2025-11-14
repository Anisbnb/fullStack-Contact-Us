const Lead = require("../models/lead");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { route } = require("../server");
const express = require("express");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

const createLead = async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    const lead = new Lead({ name, email, company, message });

    await lead.save();

    res.status(201).json({ message: "Lead created", lead });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      message: "Failed to create lead",
      error: error.message,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const allowedStatuses = ["new", "contacted", "received", "done"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const update = {};
    if (status) update.status = status;
    if (remarks !== undefined) update.remarks = remarks;

    const lead = await Lead.findByIdAndUpdate(id, update, { new: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.status(200).json({ message: "Lead updated", lead });
  } catch (error) {
    console.error("Error updating lead:", error);
    res
      .status(500)
      .json({ message: "Failed to update lead", error: error.message });
  }
};

module.exports = { createLead, updateLead };
