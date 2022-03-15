$(() => {

  const orders = JSON.parse(localStorage.getItem("orders"));
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
    `);

  });
});
