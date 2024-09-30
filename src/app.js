const express = require("express");
const { initializeWhatsAppClient } = require("./services/whatsappService");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", messageRoutes);

initializeWhatsAppClient();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
