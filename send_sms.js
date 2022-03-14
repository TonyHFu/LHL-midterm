const twilio = require('twilio');

const accountSid = 'ACb6d3cb3ba39c4884001664f9cbef3bd9'; // Your Account SID from www.twilio.com/console
const authToken = 'f5c7bf9d1ec7280237dc7d11476b083b'; // Your Auth Token from www.twilio.com/console

// const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Your order is ready for pickup!',
    to: '+16137093672', // Text this number
    from: '+17344363982', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
