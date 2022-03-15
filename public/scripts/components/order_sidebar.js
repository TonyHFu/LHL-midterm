$(() => {

  window.sideBar = {};



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
        <p>price $${price_cents / 100}</p>

        <div>
          <span class="minus">
              <button type="button">
                <i class="fa-solid fa-minus"></i>
              </button>
          </span>
          <input type="text" name="quant" id="quantity" value=${quantity} min="1">
          <span class="plus">
              <button type="button">
                <i class="fa-solid fa-plus"></i>
              </button>
          </span>
        </div>
        <button class="remove-from-order" type="submit">Remove</button>
      </div>


    `
    );

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

    $(`#order-item${item_id} .plus`).on("click", function(event) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      for (let order of orders) {
        if (order.item_id === item_id) {
          order.quantity ++;
        }
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      renderSidebar(orders);
    })



    $(`#order-item${item_id} .remove-from-order`).on("click", function(event) {

      const orders = JSON.parse(localStorage.getItem("orders"));

      const updatedOrders = orders.filter(order => {
        return order.item_id !== item_id;
      });

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      renderSidebar(updatedOrders);
    });
  }

  $("#clear-cart").on("click", event => {
    localStorage.removeItem("orders");
    $(".order-sidebar-content").empty();
    $("#subtotal").text("$0");
    $("#tax").text("$0");
    $("#total").text("$0");
  })

  $("#submit-order").on("click", function(event) {
    if (!localStorage.getItem("orders") || JSON.parse(localStorage.getItem("orders")).length === 0) {
      return alert("Your order is empty!");
    }

    postOrder()
      .then(order => {
        const order_id = order[0].id;
        localStorage.setItem("order_id", order_id);
        orders = JSON.parse(localStorage.getItem("orders"));

        return addItemsToOrder({
              items: orders,
              order_id: order_id
        });
      })
      .then(ordersSubmitted => {
        window.location.href = "/order";
      })
      .catch(err => {
        console.log(err.message);
      });

  })

  function renderSidebar(orders) {
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

  };




  window.sideBar.renderSidebar = renderSidebar;
});



