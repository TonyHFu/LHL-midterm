/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { query } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    //Fake variables for testing
    // const req = {
    //   body: {
    //     order_id: 1,
    //     items: [
    //       {
    //         item_id: 1,
    //         quantity: 1
    //       },
    //       {
    //         item_id: 2,
    //         quantity: 2
    //       },
    //       {
    //         item_id: 3,
    //         quantity: 3
    //       }
    //     ]
    //   }
    // };

    const order_id = req.body.order_id;
    let queryString = `
      INSERT INTO item_orders
      (order_id, item_id, quantity)
      VALUES
    `;
    const queryParams = [];
    let queryParamCounter = 1;
    req.body.items.forEach(item => {
      queryString += `
        ($${queryParamCounter}, $${queryParamCounter + 1}, $${queryParamCounter + 2}),`;
      queryParams.push(order_id, item.item_id, item.quantity);
      queryParamCounter += 3;
    });

    queryString.slice(0, -1);
    queryString += `
      RETURNING *;
    `;

    return db.query(queryString, queryParams)
      .then(item_orders => {
        res.send(item_orders.rows);
        return item_orders.rows;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.delete("/:id", (req, res) => {
    const item_order_id = req.params.id;
    let queryString = `
      DELETE FROM item_orders
      WHERE id = $1
      RETURNING *;
    `;
    const queryParams = [item_order_id];
    return db.query(queryString, queryParams)
      .then(item_orders => {
        res.send(item_orders.rows);
        return item_orders.rows;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.put("/:id", (req, res) => {
    const item_order_id = req.params.id;
    const newQuantity = req.body.quantity;
    let queryString = `
      UPDATE item_orders
      SET quantity = $1
      WHERE id = $2
      RETURNING *;
    `;
    const queryParams = [newQuantity, item_order_id];
    return db.query(queryString, queryParams)
      .then(item_orders => {
        res.send(item_orders.rows);
        return item_orders.rows;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
