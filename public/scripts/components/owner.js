$(() => {

  // if (!localStorage.getItem("menu")) {
  //   const newMenu = {};
  //   getAllMenuItems()
  //     .then(menuItems => {
  //       menuItems.forEach(menuItem => {
  //         newMenu[menuItem.id] = {
  //           id: menuItem.id,
  //           title: menuItem.title,
  //           description: menuItem.description,
  //           photo: menuItem.photo,
  //           price_cents: menuItem.price_cents,
  //           in_stock: menuItem.in_stock,
  //           prep_time: menuItem.prep_time,
  //           type: menuItem.type
  //         };
  //       });
  //       localStorage.setItem("menu", JSON.stringify(newMenu));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  // }


  const listCustomerOrder = (orderItem) => {
    const menu = JSON.parse(localStorage.getItem("menu"));
    const title = menu[orderItem.item_id].title;
    console.log(`#order-${orderItem.order_id}`);
    $(`#order-${orderItem.order_id}`).append(`
      <article class="order-item">
        <p>Item id: ${orderItem.item_id}</p>
        <p>Title: ${title}</p>
        <p>quantity: ${orderItem.quantity}</p>

      </article>
    `);
  };


  const newMenu = {};
  getAllMenuItems()
    .then(menuItems => {
      menuItems.forEach(menuItem => {
        newMenu[menuItem.id] = {
          id: menuItem.id,
          title: menuItem.title,
          description: menuItem.description,
          photo: menuItem.photo,
          price_cents: menuItem.price_cents,
          in_stock: menuItem.in_stock,
          prep_time: menuItem.prep_time,
          type: menuItem.type
        };
      });
      localStorage.setItem("menu", JSON.stringify(newMenu));

      getAllOrders()
        .then(orders => {
          orders.forEach(order => {
            $(".order-main").append(`
              <section id="order-${order.id}" class="customer-orders">
                <p>Order id: ${order.id}</p>
                <p>Customer id: ${order.customer_id}</p>
              </section>
            `);
            console.log(order.id);
            getItemsForOrder({ order_id: order.id })
              .then(orderItems => {
                orderItems.forEach(orderItem => {
                  listCustomerOrder(orderItem)
                });
              })
              .catch(err => {
                console.log(err);
              });

          });
        })
        .catch(err => {
          console.log(err);
        });
    });



});
