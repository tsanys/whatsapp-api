const express = require("express");
const { sendMessage, sendFile } = require("../controllers/messageController");
const { validateMessage } = require("../middleware/validation");
const { upload } = require("../middleware/fileUpload");

const router = express.Router();

router.post("/send-message", validateMessage, sendMessage);
router.post("/send-file", upload.single("file"), validateMessage, sendFile);

module.exports = router;
