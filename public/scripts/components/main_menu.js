$(() => {
  if (localStorage.getItem("orders")) {
    sideBar.renderSidebar(JSON.parse(localStorage.getItem("orders")));
  }


  function listSingleItem(menu_item) {
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

    // <!--<div class="menu-item" id="item-${id}">
    //   <figure>
    //     <img src=${photo}>
    //     <figcaption>${title}</figcaption>
    //   </figure>
    //   <p>price $${price_cents / 100}</p>
    //   <button class="add-to-order" type="submit">Add</button>
    // </div>-->

    $(".title-items").append(`

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

    //To integrate, will need to modify jquery selector probably
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

  getAllMenuItems()
    .then(result => {
      result.forEach(item => {
        listSingleItem(item);
      })
    })
    .catch(err => {
      console.error(err);
    });


});



