function addItemToOrder(data) {
  return $.ajax({
    method: "POST",
    url: "/item_orders",
    data: {
      items: data.items,
      order_id: data.order_id
    }
  });
};

function deleteItemFromOrder(data) {
  return $.ajax({
    method: "DELETE",
    url: "/item_orders/" + data.item_order_id
  })
}
