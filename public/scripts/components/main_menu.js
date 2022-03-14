$(() => {
  localStorage.setItem("orders", "[]");
  function listSingleItem(menu) {
    const {
      id,
      title,
      description,
      photo,
      price_cents,
      in_stock,
      prep_time,
      type
    } = menu;

    $("main").append(`
      <!-- <p>id: ${id}</p>
      <p>title: ${title}</p>
      <p>description: ${description}</p>
      <p>photo: ${photo}</p>
      <p>price_cents: ${price_cents}</p>
      <p>in_stock: ${in_stock}</p>
      <p>prep_time: ${prep_time}</p>
      <p>type: ${type}</p> -->

      <div class="menu-item" id="item-${id}">
        <figure>
          <img src=${photo}>
          <figcaption>${title}</figcaption>
        </figure>
        <p>price $${price_cents / 100}</p>
        <button class="add-to-order" type="submit">Add</button>
      </div>
    `
    );
    $(`#item-${id} .add-to-order`).on("click", function(event) {
      // alert(`order ${id}`);
      let orders = JSON.parse(localStorage.getItem("orders"));
      orders.push({
        item_id: id,
        title: title,
        price_cents: price_cents,
        quantity: 1,
        photo: photo
      });
      localStorage.setItem("orders", JSON.stringify(orders));
      // alert(localStorage.getItem("orders"));
      // alert("orders" + JSON.stringify(orders));
      sideBar.renderSidebar(orders);
    });
  }

  getAllMenuItems()
    .then(result => {
      // console.log("result", result);
      // console.log("result[0]", result[0]);
      result.forEach(item => {
        listSingleItem(item);
      })
    })
    .catch(err => {
      console.error(err);
    });


});



