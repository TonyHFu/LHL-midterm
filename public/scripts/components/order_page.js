$(() => {


  function renderOrders(orders) {
    $(".orders").empty();
    $(".orders").append(`
      <p>Order ID: ${localStorage.getItem("order_id")}</p>
    `);
    let subtotal = 0;
    orders.forEach(order => {
      listingOrder(order);
      subtotal += order.price_cents * order.quantity;
    });
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
        <p class="order-price">price $${price_cents / 100}</p>
        <p class="order-quantity">quantity ${quantity}</p>
        <p class="order-cost">cost $${price_cents * quantity / 100}</p>
      </div>
    `

        // <!--<p class="quantity-error">
        //   Must be between 1 and 50
        //   <i class="fa-solid fa-square-xmark remove-error"></i>
        // </p>

        // <div>
        //   <span class="minus">
        //       <button type="button">
        //         <i class="fa-solid fa-minus"></i>
        //       </button>
        //   </span>
        //   <input type="number" name="quant" class="quantity" value=${quantity} min=1 max=50>
        //   <span class="plus">
        //       <button type="button">
        //         <i class="fa-solid fa-plus"></i>
        //       </button>
        //   </span>
        //   <button class="remove-from-order" type="submit">Remove</button>
        // </div>-->
    // `
    );



    // $(`#order-item${item_id} .minus`).on("click", function(event) {
    //   const orders = JSON.parse(localStorage.getItem("orders"));

    //   for (let order of orders) {
    //     if (order.item_id === item_id) {
    //       if (order.quantity > 1) {
    //         order.quantity --;
    //       }
    //     }
    //   }

    //   localStorage.setItem("orders", JSON.stringify(orders));

    //   renderOrders(orders);
    // });

    // $(`#order-item${item_id} .plus`).on("click", function(event) {
    //   const orders = JSON.parse(localStorage.getItem("orders"));

    //   for (let order of orders) {
    //     if (order.item_id === item_id) {
    //       if (order.quantity < 50) {
    //         order.quantity ++;
    //       }
    //     }
    //   }

    //   localStorage.setItem("orders", JSON.stringify(orders));

    //   renderOrders(orders);
    // });

    // $(`#order-item${item_id} .quantity`).on("change", function(event) {
    //   const orders = JSON.parse(localStorage.getItem("orders"));

    //   $(`#order-item${item_id} .quantity-error`).hide();
    //   if ($(this).val() < 1 || $(this).val() > 50) {
    //     for (let order of orders) {
    //       if (order.item_id === item_id) {
    //         $(this).val(order.quantity);
    //       }
    //     }
    //     return $(`#order-item${item_id} .quantity-error`).show();
    //   }

    //   for (let order of orders) {
    //     if (order.item_id === item_id) {
    //       order.quantity = $(this).val();
    //     }
    //   }

    //   localStorage.setItem("orders", JSON.stringify(orders));

    //   renderOrders(orders);
    // });

    // $(`#order-item${item_id} .remove-error`).on("click", function(event) {
    //   $(`#order-item${item_id} .quantity-error`).hide();
    // });

    // $(`#order-item${item_id} .remove-from-order`).on("click", function(event) {

    //   const orders = JSON.parse(localStorage.getItem("orders"));

    //   const updatedOrders = orders.filter(order => {
    //     return order.item_id !== item_id;
    //   });

    //   localStorage.setItem("orders", JSON.stringify(updatedOrders));

    //   renderOrders(updatedOrders);
    // });
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

  let estimatedTime = 10;

  const displayEstimatedTime = setInterval(function() {
    estimatedTime -= 1;
    $(".time-estimate").text(estimatedTime);

  }, 1000);

  setTimeout(function() {
    clearInterval(displayEstimatedTime);
    $(".time-estimate").empty();
    $(".to-completion").text("Your order is complete!");
  }, estimatedTime * 1000);


});
