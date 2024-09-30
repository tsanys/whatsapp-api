# WhatsApp API

This is a simple WhatsApp API built using **Express.js** and **whatsapp-web.js**, allowing you to send messages and files via WhatsApp.

## Features

- Send WhatsApp text messages
- Send WhatsApp file messages
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

Once you've scanned the QR code, the WhatsApp Web client will connect, and the API will be ready to send messages via WhatsApp.

## API Endpoints

### 1. Send Message

Send a text message to a WhatsApp number.

- **Endpoint**: `/api/send-message`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "to": "<recipient_phone_number>",
  "message": "<message_text>"
}
```

- `to`: The recipient's phone number, including the country code (e.g., `6287754412191` for an Indonesian number).
- `message`: The text message to be sent.

#### Example Curl Command

```bash
curl --location 'http://localhost:3000/api/send-message' \
--header 'Content-Type: application/json' \
--data '{
    "to": "6287754412191",
    "message": "lorem ipsum dolor sit amet"
}'
```

### 2. Send File

Send a file to a WhatsApp number along with a text message.

- **Endpoint**: `/api/send-file`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### Form Data

- `to`: The recipient's phone number, including the country code (e.g., `6287754412191`).
- `message`: The accompanying text message (optional).
- `file`: The file to be sent, uploaded from the user's local system.

#### Example Curl Command

```bash
curl --location 'http://localhost:3000/api/send-file' \
--form 'to="6287754412191"' \
--form 'message="testing"' \
--form 'file=@"/path/to/file.png"'
```

### Response

For both endpoints, a successful response will return:

- **Status**: `200 OK`
- **Body**: A success message confirming that the message or file was sent successfully.

Example:

```json
{
  "status": "success",
  "message": "Message sent successfully!"
}
```

## Conclusion

This API provides simple endpoints to send messages and files via WhatsApp using WhatsApp Web and Express.js. Make sure the client is ready to use the app
