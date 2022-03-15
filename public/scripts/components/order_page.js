$(() => {

  const orders = JSON.parse(localStorage.getItem("orders"));
  $(".orders").append(`
    <p>Order ID: ${localStorage.getItem("order_id")}</p>
  `);
  orders.forEach(order => {
    const {
      item_id,
      photo,
      price_cents,
      quantity,
      title
    } = order;
    $(".orders").append(`
      <p>item_id: ${item_id}</p>
      <p>photo: ${photo}</p>
      <p>price_cents: ${price_cents}</p>
      <p>quantity: ${quantity}</p>
      <p>title: ${title}</p>
      <div class="menu-item" id="item-${item_id}">
        <figure>
          <img src=${photo}>
          <figcaption>${title}</figcaption>
        </figure>
        <p>price $${price_cents / 100}</p>
        <button class="add-to-order" type="submit">Add</button>
      </div>
    `);

  });
});
