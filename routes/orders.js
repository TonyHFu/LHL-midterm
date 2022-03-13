/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    //Assuming items like
    // [
    //   {
    //     item_id: id,
    //     quantity: quantity
    //   },
    //   {
    //     item_id: id,
    //     quantity: quantity
    //   },
    //   {
    //     item_id: id,
    //     quantity: quantity
    //   },
    // ]
    res.send(`posted order for user ${user_id}`);
    db.query(`
      INSERT INTO orders (customer_id, is_complete)
      VALUES($1, false)
      RETURNING *;
    `, [user_id])
    .then(order => {
      res.send(order.rows);
      return order.rows;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  router.put("/:id", (req, res) => {

    const user_id = req.session.user_id;
    const order_id = req.params.id;

    res.send(`edited order for user ${user_id} for order ${order_id}`);


  });

  router.delete("/:id", (req, res) => {

    const user_id = req.session.user_id;
    const order_id = req.params.id;

    res.send(`deleted order for user ${user_id} for order ${order_id}`);

  });


  //Lighthouse example

  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM widgets`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
};
