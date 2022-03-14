require('dotenv').config();
// console.log(process.env);// remove this after you've confirmed it working
const twilio = require('twilio');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Your order is ready for pickup!',
    from: '+16137093672',// Text this number
    to: '+17344363982'// From a valid Twilio number
  })
  .then(message => console.log(message.sid));
