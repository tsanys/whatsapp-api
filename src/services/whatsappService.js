const { Client, MessageMedia, RemoteAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { formattedNumber } = require("../lib/utils");
const { MongoStore } = require("wwebjs-mongo");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

let client;
let isClientReady = false;

dotenv.config();

exports.initializeWhatsAppClient = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const store = new MongoStore({ mongoose: mongoose });

    console.log("Initializing WhatsApp client...");

    client = new Client({
      puppeteer: { headless: true, args: ["--no-sandbox"] },
      authStrategy: new RemoteAuth({
        store,
        clientId: "whatsapp",
        backupSyncIntervalMs: 300000,
      }),
    });

    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      isClientReady = true;
    });

    client.on("authenticated", () => {
      console.log("AUTHENTICATED");
    });

    client.on("remote_session_saved", () => {
      console.log("REMOTE SESSION SAVED");
    });

    client.on("auth_failure", (msg) => {
      console.error("AUTHENTICATION FAILURE", msg);
    });

    client.on("disconnected", (reason) => {
      console.log("Client was disconnect, reasong:", reason);
      isClientReady = false;

      client.initialize();
    });

    await client.initialize();
  } catch (error) {
    console.error("Failed to initialize WhatsApp client:", error.message);
    isClientReady = false;
  }
};

exports.sendWhatsAppMessage = async (to, message) => {
  if (!client || !isClientReady) {
    throw new Error("WhatsApp client not initialized or not ready");
  }

  const receiver = formattedNumber(to);
  await client.sendMessage(receiver, message);
};

exports.sendWhatsAppFile = async (to, filePath, caption) => {
  if (!client || !isClientReady) {
    throw new Error("WhatsApp client not initialized or not ready");
  }

  const media = MessageMedia.fromFilePath(filePath);
  const receiver = formattedNumber(to);

  if (caption) {
    await client.sendMessage(receiver, media, { caption });
  } else {
    await client.sendMessage(receiver, media);
  }
};
