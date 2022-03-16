$(() => {
  const orders = JSON.parse(localStorage.getItem("orders"));
  $(".orders").append(`
    <p>Order ID: ${localStorage.getItem("order_id")}</p>
  `);
  let subtotal = 0;
  orders.forEach(order => {
    const {
      item_id,
      photo,
      price_cents,
      quantity,
      title
    } = order;
    $(".orders").append(`
    <p>Item: ${title}</p>
    <p>Price: $${price_cents / 100}</p>
    `);

    subtotal += order.price_cents * order.quantity;
    $("#subtotal").text("$" + subtotal / 100);
    const tax = Math.round(subtotal * 0.05);
    $("#tax").text("$" + (tax / 100).toFixed(2));
    const total = subtotal + tax;
    $("#total").text("$" + (total / 100).toFixed(2));
  });

  $('.cancel-order').on("click", function(event) {
    const orderId = {
      'order_id': JSON.parse(localStorage.getItem('order_id'))
    };
    console.log(orderId.order_id);

    deleteOrder(orderId)
      .then(orders => {
        console.log('order deleted');
      })
      .catch(err => {
        console.log(err.message);
      });
      //notification to owner (twilio)

  });

});
