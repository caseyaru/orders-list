export const DATE = new Date().toISOString().slice(0, 10).replace(/-/g, '');
export const PASSWORD = "Valantis";

export const AUTH = `${PASSWORD}_${DATE}`;

export const BASE_URL = "http://api.valantis.store:40000";

  // const handleSetOrders = () => {
  //   MainApi.getIds(0, 200)
  //     .then((res) => {
  //       console.log("res get ids", res);
  //       MainApi.getItems(res.result)
  //         .then((res) => {
  //           console.log("res get items", res);
  //           setOrders(res.result);
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // };