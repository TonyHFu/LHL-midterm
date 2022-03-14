function getAllMenuItems() {
  console.log("getting menu");
  return $.ajax({
    url: "/menu",
  });
};

function postOrder(data) {
  return $.ajax({
    method: "POST",
    url: "/orders",
    data: {
      user_id: data.user_id //not strictly necessary
    }
  });
};

function putOrder(data) {
  return $.ajax({
    method: "PUT",
    url: "/orders" + data.order_id,
    data: {
      is_complete: data.is_complete
    }
  });
};

function deleteOrder(data) {
  return $.ajax({
    method: "DELETE",
    url: "/orders" + data.order_id
  });
};

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


//TEST DRIVE CODE:
// console.log("getAllMenuItems()",getAllMenuItems());
// getAllMenuItems()
//   .then(result => {
//     // console.log("result", result);
//     console.log("result[0]", result[0]);
//   })
//   .catch(err => {
//     console.error(err);
//   });
