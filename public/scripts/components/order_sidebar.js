$(() => {

  window.sideBar = {};

  function listingOrderSidebar(order_item) {
    const {
      id,
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
      <div class="order-item" id="order-item${id}">
        <figure>
          <img src=${photo}>
          <figcaption>${title}</figcaption>
        </figure>
        <p>price $${price_cents / 100}</p>
        <input type="number" id="quantity" name="quantity" min="1" value=${quantity}>
        <button class="remove-from-order" type="submit">Remove</button>
      </div>
    `
    );
  }

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



