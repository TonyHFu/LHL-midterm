function getAllMenuItems() {
  return $.ajax({
    url: "/menu",
  });
};

function getSingleMenuItem(data) {
  return $.ajax({
    url: "/menu/" + data.item_id
  });
};

function postOrder() {
  return $.ajax({
    method: "POST",
    url: "/orders"
  });
};

function putOrder(data) {
  return $.ajax({
    method: "PUT",
    url: "/orders/" + data.order_id,
    data: {
      is_complete: data.is_complete
    }
  });
};

function deleteOrder(data) {
  return $.ajax({
    method: "DELETE",
    url: "/orders/" + data.order_id
  });
};

function addItemsToOrder(data) {
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
  });
};

function putItemOrder(data) {
  return $.ajax({
    method: "PUT",
    url: "/item_orders/" + data.item_order_id,
    data: {
      quantity: data.quantity
    }
  });
};

