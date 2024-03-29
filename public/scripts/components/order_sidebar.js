$(() => {

  window.sideBar = {};

  //Main Inner Function
  function listingOrderSidebar(order_item) {
    const {
      item_id,
      title,
      description,
      photo,
      price_cents,
      in_stock,
      prep_time,
      type,
      quantity
    } = order_item;

    $(".order-sidebar-content").append(`
      <div class="order-item" id="order-item${item_id}">
        <figure>
          <img src=${photo}>
          <figcaption>${title}</figcaption>
        </figure>
        <p>cost $${price_cents * quantity / 100}</p>
        <p class="quantity-error">
          Must be between 1 and 50
          <i class="fa-solid fa-square-xmark remove-error"></i>
        </p>

        <div>
          <span class="minus">
              <button type="button">
                <i class="fa-solid fa-minus"></i>
              </button>
          </span>
          <input type="number" name="quant" class="quantity" value=${quantity} min=1 max=50>
          <span class="plus">
              <button type="button">
                <i class="fa-solid fa-plus"></i>
              </button>
          </span>
          <button class="remove-from-order" type="submit">Remove</button>
        </div>
      </div>
    `
    );

    //Minus Event
    $(`#order-item${item_id} .minus`).on("click", function(event) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      for (let order of orders) {
        if (order.item_id === item_id) {
          if (order.quantity > 1) {
            order.quantity --;
          }
        }
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      renderSidebar(orders);
    })

    //Plus Event
    $(`#order-item${item_id} .plus`).on("click", function(event) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      for (let order of orders) {
        if (order.item_id === item_id) {
          if (order.quantity < 50) {
            order.quantity ++;
          }
        }
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      renderSidebar(orders);
    })

    //Quantity change Event
    $(`#order-item${item_id} .quantity`).on("change", function(event) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      $(`#order-item${item_id} .quantity-error`).hide();
      if ($(this).val() < 1 || $(this).val() > 50) {
        for (let order of orders) {
          if (order.item_id === item_id) {
            $(this).val(order.quantity);
          }
        }
        return $(`#order-item${item_id} .quantity-error`).show();
      }

      for (let order of orders) {
        if (order.item_id === item_id) {
          order.quantity = $(this).val();
        }
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      renderSidebar(orders);
    });

    //Remove-error Event
    $(`#order-item${item_id} .remove-error`).on("click", function(event) {
      $(`#order-item${item_id} .quantity-error`).hide();
    });

    //Remove from order Event
    $(`#order-item${item_id} .remove-from-order`).on("click", function(event) {

      const orders = JSON.parse(localStorage.getItem("orders"));

      const updatedOrders = orders.filter(order => {
        return order.item_id !== item_id;
      });

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      renderSidebar(updatedOrders);
    });
  };
  //End of main inner function

  //Clear cart Event
  $("#clear-cart").on("click", event => {
    localStorage.removeItem("orders");
    $(".order-sidebar-content").empty();
    $("#subtotal").text("$0");
    $("#tax").text("$0");
    $("#total").text("$0");
    $("#checkout-button").removeClass("cart-ready");
  })

  //Submit order Event
  $("#submit-order").on("click", function(event) {
    if (!localStorage.getItem("orders") || JSON.parse(localStorage.getItem("orders")).length === 0) {
      return alert("Your order is empty!");
    }

    let quantityError = false;
    $(".quantity").each(function(i) {
      if ($(this).val() < 1 || $(this).val() > 50) {
        quantityError = true;
        return alert("Check your order for errors!");
      }
    });

    //Because you can't return from within .each method
    if (quantityError) {
      return;
    }

    postOrder()
      .then(order => {
        const orders = JSON.parse(localStorage.getItem("orders"));
        const order_id = order[0].id;
        localStorage.setItem("order_id", order_id);
        return addItemsToOrder({
              items: orders,
              order_id: order_id
        });
      })
      .then(ordersSubmitted => {
        const item_orders = [];
        ordersSubmitted.forEach(submittedOrder => {
          item_orders.push({
            item_order_id: submittedOrder.id,
            item_id: submittedOrder.item_id,
            quantity: submittedOrder.quantity
          });
        });

        localStorage.setItem("item_orders", JSON.stringify(item_orders));
        window.location.href = "/order";
      })
      .catch(err => {
        console.log(err.message);
      });

  });

  //Confirm-changes Event
  $("#confirm-changes").on("click", function(event) {
    if (!localStorage.getItem("orders")) {
      const orderId = {
        'order_id': JSON.parse(localStorage.getItem('order_id'))
      };
      return deleteOrder(orderId)
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
    }

    const cart = JSON.parse(localStorage.getItem("orders"));

    const item_orders = JSON.parse(localStorage.getItem("item_orders"));

    const cartObj = {};
    for (let order of cart) {
      cartObj[order.item_id] = order;
    }

    const itemsObj = {};
    for (let item of item_orders){
      itemsObj[item.item_id] = item;
    }

    const newItemOrders = [];
    for (let cartItem in cartObj) {
      if (cartItem in itemsObj) {
        putItemOrder({
          item_order_id: itemsObj[cartItem].item_order_id,
          quantity: cartObj[cartItem].quantity
        });
      } else {
        newItemOrders.push(cartObj[cartItem]);
      }
    }

    addItemsToOrder({
      items: newItemOrders,
      order_id: localStorage.getItem("order_id")
    });

    for (let orderItem in itemsObj) {
      if (!(orderItem in cartObj)) {
        deleteItemFromOrder({ item_order_id: itemsObj[orderItem].item_order_id });
      }
    }

    orderEditNotification({ order_id: localStorage.getItem("order_id") });

    localStorage.setItem("item_orders", localStorage.getItem("orders"));

    window.location.href = "/order";

  });

  //Main outer function
  function renderSidebar(orders) {

    if (localStorage.getItem("order_id")) {
      $("#submit-order").hide();
      $("#confirm-changes").show();
    }

    $(".order-sidebar-content").empty();
    let subtotal = 0;
    orders.forEach(order => {
      listingOrderSidebar(order);
      subtotal += order.price_cents * order.quantity;
    });
    $("#subtotal").text("$" + subtotal / 100);
    const tax = Math.round(subtotal * 0.05);
    $("#tax").text("$" + (tax / 100).toFixed(2));
    const total = subtotal + tax;
    $("#total").text("$" + (total / 100).toFixed(2));
    if (orders.length > 0) {
      return $("#checkout-button").addClass("cart-ready");
    }
    $("#checkout-button").removeClass("cart-ready");
  };

  //Hide-sidebar event
  $("#hide-sidebar").on("click", function(event) {
    $(".order-sidebar").hide();
  });



  window.sideBar.renderSidebar = renderSidebar;
});
