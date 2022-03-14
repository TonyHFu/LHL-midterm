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
      type
    } = order_item;

    $(".order-sidebar").append(`
      <div class="order-item" id="order-item${id}">
        <figure>
          <img src=${photo}>
          <figcaption>${title}</figcaption>
        </figure>
        <p>price $${price_cents / 100}</p>
        <input type="number" id="quantity" name="quantity" min="1" value=1>
        <button class="remove-from-order" type="submit">Remove</button>
      </div>
    `
    );
  }

  //Async version
  // function renderSidebar(orders) {
  //   $(".order-sidebar").empty();
  //   orders.forEach(order => {
  //     getSingleMenuItem(order)
  //       .then(order_item => {
  //         listingOrderSidebar(order_item);
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   });
  // };

  function renderSidebar(orders) {
    $(".order-sidebar").empty();
    orders.forEach(order => {
      listingOrderSidebar(order);
    });
  };

  window.sideBar.renderSidebar = renderSidebar;


});



