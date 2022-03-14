$(() => {

  function listingMenu(menu) {
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

    $(".order-sidebar").append(`
      <p>id: ${id}</p>
      <p>title: ${title}</p>
      <p>description: ${description}</p>
      <p>photo: ${photo}</p>
      <p>price_cents: ${price_cents}</p>
      <p>in_stock: ${in_stock}</p>
      <p>prep_time: ${prep_time}</p>
      <p>type: ${type}</p>

      <div class="menu-item" id="item1">
        <figure>
          <img src=${photo}>
          <figcaption>${description}</figcaption>
        </figure>
        <button class="add-to-order" type="submit">Add</button>
      </div>
    `
    );
  }

  getAllMenuItems()
    .then(result => {
      // console.log("result", result);
      console.log("result[0]", result[0]);
      listingMenu(result[0]);
    })
    .catch(err => {
      console.error(err);
    });

});



