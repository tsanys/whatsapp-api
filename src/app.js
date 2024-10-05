const express = require("express");
const { initializeWhatsAppClient } = require("./services/whatsappService");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", messageRoutes);

async function start() {
  try {
    await initializeWhatsAppClient();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
}

start();
