/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { client } = require('../server.js');
const { sendText } = require('../send_sms');

module.exports = (db) => {

  router.post("/", (req, res) => {
    const user_id = req.session.user_id;

    // res.send(`posted order for user ${user_id}`);
    db.query(`
      INSERT INTO orders (customer_id, is_complete)
      VALUES($1, false)
      RETURNING *;
    `, [user_id])
      .then(order => {
        sendText (`An order has been placed`);
        res.json(order.rows);
        console.log("order", order);
      })
      .catch(err => {
        console.log(err.message)
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.put("/:id", (req, res) => {

    const user_id = req.session.user_id;
    const order_id = req.params.id;

    // res.send(`completed order for user ${user_id} for order ${order_id}`);

    db.query(`
      UPDATE orders
      SET is_complete = true
      WHERE id = $1
      RETURNING *;
    `, [order_id])
      .then((order) => {
        sendText("Your order is ready for pickup!");
        res.json(order.rows);
        console.log(order_id);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.delete("/:id", (req, res) => {

    const user_id = req.session.user_id;
    const order_id = req.params.id;

    // res.send(`deleted order for user ${user_id} for order ${order_id}`);
    db.query(`
      DELETE FROM orders
      WHERE id = $1
      RETURNING *;
    `, [order_id])
      .then((order) => {
        sendText (`The order ${order_id} has been cancelled`);
        res.json(order.rows);
      })
      .catch(err => {
        console.log(err.message);
        res.status(500)
        res.json({ error:err.message });
      });
  });

  return router;
};
