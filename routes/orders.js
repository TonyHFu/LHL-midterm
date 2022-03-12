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
    // db.insertOrder(req.body) // Need parameter change once query function written
    //   .then(order => {
    //     //Add API call to Twilio
    //     res.send(order)
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     res.send(error);
    //   });
  });

  router.put("/:id", (req, res) => {
    // db.putOrder(req.body) // Need parameter change once query function written
    //   .then(order => {
    //     //Add API call to Twilio
    //     res.send(order)
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     res.send(error);
    //   });
  });

  router.delete("/:id", (req, res) => {
    // db.removeOrder(req.body) // Need parameter change once query function written
    //   .then(order => {
    //     //Add API call to Twilio
    //     res.send(order)
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     res.send(error);
    //   });
  });


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
  // return router;
};
