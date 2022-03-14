getAllMenuItems()
  .then(result => {
    // console.log("result", result);
    console.log("result[0]", result[0]);
  })
  .catch(err => {
    console.error(err);
  });
