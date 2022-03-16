/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { client } = require('../server.js');
const { sendText } = require('../send_sms');

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    const order_id = req.params.id;
    sendText(`Order ID ${order_id} has been updated!`);
  });

  return router;
};
