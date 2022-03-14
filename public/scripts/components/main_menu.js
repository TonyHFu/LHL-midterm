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

    $("main").append(`
      <!-- <p>id: ${id}</p>
      <p>title: ${title}</p>
      <p>description: ${description}</p>
      <p>photo: ${photo}</p>
      <p>price_cents: ${price_cents}</p>
      <p>in_stock: ${in_stock}</p>
      <p>prep_time: ${prep_time}</p>
      <p>type: ${type}</p> -->

      <div class="menu-item" id="item1">
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

  getAllMenuItems()
    .then(result => {
      // console.log("result", result);
      // console.log("result[0]", result[0]);
      result.forEach(item => {
        listingMenu(item);
      })
    })
    .catch(err => {
      console.error(err);
    });

});



