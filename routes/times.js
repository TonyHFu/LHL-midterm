const express = require('express');
const router  = express.Router();



module.exports = () => {

  const orderTimes = {};
  router.get("/:id", (req, res) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    console.log("orderTimes", orderTimes);
    const order_id = req.params.id;
    console.log(`ETA for order ${order_id} is ${orderTimes[order_id]}`);
    res.json({
      orderTime: orderTimes[order_id].orderTime,
      updateId: orderTimes[order_id].updateId
    });
    orderTimes[order_id].updateId = false;
  });

  router.post("/:id", (req, res) => {
    const order_id = req.params.id;
    const newTime = req.body.newTime;
    const updateId = orderTimes[order_id] ? true : false;
    console.log(updateId);
    orderTimes[order_id] = {
      orderTime: newTime,
      updateId
    };
    console.log(`Order ${order_id} has new ETA of ${newTime}`);
    res.send(`Order ${order_id} has new ETA of ${newTime}`);
  })
  return router;
};

