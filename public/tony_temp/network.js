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

