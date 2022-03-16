function getAllMenuItems() {
  return $.ajax({
    url: "/api/menu",
  });

};

function getSingleMenuItem(data) {
  return $.ajax({
    url: "/api/menu/" + data.item_id
  });
};

function postOrder() {
  return $.ajax({
    method: "POST",
    url: "/api/orders"
  });
};

function putOrder(data) {
  return $.ajax({
    method: "PUT",
    url: "/api/orders/" + data.order_id,
    data: {
      is_complete: data.is_complete
    }
  });
};

function deleteOrder(data) {
  return $.ajax({
    method: "DELETE",
    url: "/api/orders/" + data.order_id
  });
};

function addItemsToOrder(data) {
  return $.ajax({
    method: "POST",
    url: "/api/item_orders",
    data: {
      items: data.items,
      order_id: data.order_id
    }
  });
};

function deleteItemFromOrder(data) {
  return $.ajax({
    method: "DELETE",
    url: "/api/item_orders/" + data.item_order_id
  });
};

function putItemOrder(data) {
  return $.ajax({
    method: "PUT",
    url: "/api/item_orders/" + data.item_order_id,
    data: {
      quantity: data.quantity
    }
  });
};

function orderEditNotification(data) {
  return $.ajax({
    url: "/api/notify/" + data.order_id
  });
};

