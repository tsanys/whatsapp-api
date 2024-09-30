# WhatsApp API

This is a simple WhatsApp API built using **Express.js** and **whatsapp-web.js**. It allows you to send messages.

## Features

- Send WhatsApp text and file messages
- Integration with WhatsApp Web
- Built with Express.js and whatsapp-web.js

## Getting Started

Follow the steps below to clone, set up, and run the application.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tsanys/whatsapp-api.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd whatsapp-api
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

### Running the App

4. **Start the application in development mode**:

   ```bash
   npm run dev
   ```

5. **Wait for the QR Code to appear**.

6. **Scan the QR Code** with your WhatsApp mobile app.

   - Open WhatsApp on your phone.
   - Go to **Settings** > **Linked Devices** > **Link a Device**.
   - Scan the QR Code displayed in the terminal with your phone.

### Usage

Once you've scanned the QR code, the WhatsApp Web client will connect and the application will be ready to send messages via the WhatsApp API.
