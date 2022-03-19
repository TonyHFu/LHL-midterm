$(() => {

  $(".time-estimate").text(localStorage.getItem("estimated_prep_time"));

  function renderOrders(orders) {
    $(".orders").empty();
    $(".orders").append(`
      <p id = "order-id">Order ID: ${localStorage.getItem("order_id")}</p>
    `);
    let subtotal = 0;
    orders.forEach(order => {
      listingOrder(order);
      subtotal += order.price_cents * order.quantity;
    })

    $("#subtotal").text("$" + subtotal / 100);
    const tax = Math.round(subtotal * 0.05);
    $("#tax").text("$" + (tax / 100).toFixed(2));
    const total = subtotal + tax;
    $("#total").text("$" + (total / 100).toFixed(2));

  };

  function listingOrder(order) {
    const {
      item_id,
      photo,
      price_cents,
      quantity,
      title
    } = order;
    $(".orders").append(`
      <div class="order-item" id="order-item${item_id}">
        <figure>
          <img src=${photo}>
          <figcaption>${title}</figcaption>
        </figure>
        <p class="order-price">price: $${price_cents / 100}</p>
        <p class="order-quantity">quantity: ${quantity}</p>
        <p class="order-cost">cost: $${price_cents * quantity / 100}</p>
      </div>
    `
    );
  }






  $('.cancel-order').on("click", function(event) {
    const orderId = {
      'order_id': JSON.parse(localStorage.getItem('order_id'))
    };
    console.log(orderId.order_id);

    deleteOrder(orderId)
      .then(orders => {
        console.log('order deleted');
        localStorage.removeItem("order_id");
        localStorage.removeItem("item_orders");
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err.message);
      });
      //notification to owner (twilio)

  });

  $(".edit-order").on("click", function(event) {
    window.location.href = "/";
  });



  const orders = JSON.parse(localStorage.getItem("orders"));

  renderOrders(orders);




  const displayEstimatedTime = setInterval(function() {
    if ($(".time-estimate").text() == 0 || $(".time-estimate").text() === "Waiting for restaurant confirmation") {
      return $(".time-estimate").text("Waiting for restaurant confirmation");
    }
    let estimatedTime = Number($(".time-estimate").text());
    estimatedTime -= 1;
    $(".time-estimate").text(estimatedTime);

  }, 1000);

  const contactServer = setInterval(function() {
    const order_id = localStorage.getItem("order_id");
    getTime(order_id)
      .then(newTime => {
        if (newTime.updateId) {
          if (newTime.orderTime === "done") {
            clearInterval(displayEstimatedTime);
            clearInterval(contactServer);
            $(".text").empty();
            $("main p").empty();
            $(".orders").empty();
            $('button').remove();
            $(".text").append(`<p>Your order (# ${order_id}) is ready for pickup!`);
            localStorage.removeItem("order_id");
            localStorage.removeItem("orders");
            localStorage.removeItem("item_orders");
            return;
          }
          $(".time-estimate").text(newTime.orderTime);
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  }, 10500);




  // setTimeout(function() {
    // clearInterval(displayEstimatedTime);
    // $(".text").empty();
    // $("main p").empty();
    // $(".orders").empty();
    // $('button').remove();
    // const order_id = localStorage.getItem("order_id");
    // $(".text").append(`<p>Your order (# ${order_id}) is ready for pickup!`);

  //   putOrder({
  //     order_id: order_id,
  //     is_complete: true
  //   });



    // localStorage.removeItem("order_id");
    // localStorage.removeItem("orders");
    // localStorage.removeItem("item_orders");

  // }, estimatedTime * 1000);


});
