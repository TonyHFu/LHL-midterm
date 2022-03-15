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
    front end --> backend
    client (browser) html css, client js


    server, routes, db

    make request (Network AJAX)
      which order, delete
      delete /orders/:id
        delete from db
        notification to owner (twilio)



    ->backend
    delete order (orders array)
  });





});
