require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendText = (message) => {

  return client.messages.create({
    body: message,
    to: process.env.PHONE_NUM, // Text this number
    from: process.env.TWILIO_NUM // From a valid Twilio number
  })
    .then((message) => {
      return message.sid;
    })
    .catch((err) => {
      return err.messages;
    });

};

module.exports = { sendText };
