const { validationResult } = require("express-validator");
const {
  sendWhatsAppMessage,
  sendWhatsAppFile,
} = require("../services/whatsappService");

exports.sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { to, message } = req.body;

  try {
    await sendWhatsAppMessage(to, message);
    res.status(200).json({ status: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: `Failed to send message: ${error}` });
  }
};

exports.sendFile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { to, message } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    await sendWhatsAppFile(to, file.path, message);
    res.status(200).json({ status: "File sent successfully" });
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).json({ error: "Failed to send file" });
  }
};
