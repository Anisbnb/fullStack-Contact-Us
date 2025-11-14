const mg = require("mongoose");
const express12 = require("express");

const authClient = (req, res, next) => {
  const clientId = req.headers["clientId"];
  if (!clientId) {
    return res.status(400).json({ message: "Client ID is required" });
  }
  try {
    if (!mg.ObjectId.isValid(clientId)) {
      return res.status(400).json({ message: "Invalid Client ID" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
module.exports = authClient;
