require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Your order is ready for pickup!',
//     to: process.env.PHONE_NUM, // Cell phone number
//     from: process.env.TWILIO_NUM, // Twilio number
//   })
//   .then((message) => console.log(message.sid));

module.exports = { client };
