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
    const photo = menu[orderItem.item_id].photo;
    const prep_time = menu[orderItem.item_id].prep_time;

    console.log(`#order-${orderItem.order_id}`);
    $(`#order-${orderItem.order_id}`).append(`
      <article class="order-item">
        <p>Item id: ${orderItem.item_id}</p>
        <p>Title: ${title}</p>
        <img src=${photo}>
        <p>quantity: ${orderItem.quantity}</p>
        <p>estimated prep time: ${prep_time}</p>

      </article>
    `);
  };

  const displaysForEstimatedTime = [];

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
                let estimated_prep_time = 0;
                orderItems.forEach(orderItem => {
                  listCustomerOrder(orderItem);
                  const menu = JSON.parse(localStorage.getItem("menu"));
                  const prep_time = menu[orderItem.item_id].prep_time;
                  if (prep_time > estimated_prep_time) {
                    estimated_prep_time = prep_time;
                  }

                });
                $(`#order-${order.id}`).append(`
                  <footer>
                    <label for="estimated-time">ETA</label>
                    <input type="number" value=${estimated_prep_time} name="estimated-time" class="estimated-time-quantity">
                    <button class="change-estimated-time">Update</button>
                    <button class="mark-order-done">Done</button>
                  </footer>
                `);

                const displayEstimatedTime = setInterval(() => {
                  let orderEstimatedTime = $(`#order-${order.id} .estimated-time-quantity`).val();
                  if (orderEstimatedTime == 0) {

                    $(`#order-${order.id}`).addClass("borderBlink");

                    return clearInterval(displayEstimatedTime);
                  }
                  orderEstimatedTime --;
                  $(`#order-${order.id} .estimated-time-quantity`).val(orderEstimatedTime);
                }, 1000);

                $(`#order-${order.id} .estimated-time-quantity`).on("change", function(event) {
                  $(`#order-${order.id} .change-estimated-time`).addClass("update-customer");
                });

                $(`#order-${order.id} .change-estimated-time`).on("click", function(event) {
                  $(this).removeClass("update-customer");
                  $(`#order-${order.id}`).removeClass("borderBlink");
                  //reset setinterval
                  const displayEstimatedTime = setInterval(() => {
                    let orderEstimatedTime = $(`#order-${order.id} .estimated-time-quantity`).val();
                    if (orderEstimatedTime == 0) {

                      $(`#order-${order.id}`).addClass("borderBlink");

                      return clearInterval(displayEstimatedTime);
                    }
                    orderEstimatedTime --;
                    $(`#order-${order.id} .estimated-time-quantity`).val(orderEstimatedTime);
                  }, 1000);

                  const newTime = $(`#order-${order.id} .estimated-time-quantity`).val();
                  updateTime(order.id, newTime)
                    // .then(ajaxPromise => {
                      // console("customer order page updated!");
                    // })
                    .catch(err => {
                      console.error(err.message);
                    });
                });

                const updateCustomerTime = setInterval(function() {
                  if (!$(`#order-${order.id} .change-estimated-time`).hasClass("update-customer")) {
                    const newTime = $(`#order-${order.id} .estimated-time-quantity`).val();
                    updateTime(order.id, newTime)
                      .catch(err => {
                        console.error(err.message);
                      });
                  }
                }, 10000);

                $(`#order-${order.id} .mark-order-done`).on("click", function(event) {
                      putOrder({
                        order_id: order.id,
                        is_complete: true
                      })
                        .then(completed => {
                          return updateTime(order.id, "done");
                        })
                        .then(updatedTime => {
                          clearInterval(updateCustomerTime);
                          $(`#order-${order.id}`).removeClass("borderBlink");
                          $(`#order-${order.id} .order-item`).hide();
                          $(`#order-${order.id} footer`).hide();
                          $(`#order-${order.id}`).append(`
                            <p>You've marked the order complete!</p>
                          `);

                        })
                        .catch(err => {
                          console.log(err.message);
                        });
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
