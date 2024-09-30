const { body } = require("express-validator");

exports.validateMessage = [
  body("to").isMobilePhone("id-ID").withMessage("Invalid phone number"),
  body("message").optional().isString().withMessage("Message must be a string"),
];
