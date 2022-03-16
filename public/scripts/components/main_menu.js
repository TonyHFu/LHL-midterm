$(() => {
  $(".order-sidebar").hide();

  if (localStorage.getItem("orders")) {
    if (localStorage.getItem("orders") !== "[]") {
      $(".order-sidebar").show();
    }
    sideBar.renderSidebar(JSON.parse(localStorage.getItem("orders")));

  }



  function listSingleItem(menu_item, item_type) {
    const {
      id,
      title,
      description,
      photo,
      price_cents,
      in_stock,
      prep_time,
      type
    } = menu_item;

    $(`#${item_type}-items`).append(`

      <div class="menu-item" id="item-${id}">
          <p class='item-name'>${title}</p>
          <figure>
            <img class = "item-photo" src=${photo}>
            <figcaption>${description}</figcaption>
          </figure>
          <div class="item-footer">
            <p class='price'>$${price_cents / 100}</p>
            <button class="add-to-order" type="submit">Add</button>
          </div>
        </div>
    `
    );

    $(`#item-${id} .add-to-order`).on("click", function(event) {
      if (!localStorage.getItem("orders")) {
        localStorage.setItem("orders", "[]");
      }
      let orders = JSON.parse(localStorage.getItem("orders"));

      let order_item_exists = false;
      for (let order of orders) {
        if (id === order.item_id) {
          order.quantity += 1;
          order_item_exists = true;
        }
      }
      if (!order_item_exists) {
        let quantity = 1;
        orders.push({
          item_id: id,
          title: title,
          price_cents: price_cents,
          quantity: 1,
          photo: photo,
          quantity: quantity
        });
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      sideBar.renderSidebar(orders);
    });
  }

  $("#checkout-button").on("click", function(event) {
    $(".order-sidebar").show();
  });




  getAllMenuItems()
    .then(result => {
      result.forEach(item => {
        listSingleItem(item, item.type);
      })
    })
    .catch(err => {
      console.error(err);
    });


});



