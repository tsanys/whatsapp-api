const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { formattedNumber } = require("../lib/utils");

let client;
let isClientReady = false;

exports.initializeWhatsAppClient = () => {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox"],
    },
  });

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
    isClientReady = true;
  });

  client.initialize();
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
