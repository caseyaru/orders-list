const CryptoJS = require("crypto-js");

export function generateHash(data) {
    return CryptoJS.MD5(data).toString();
}

// useEffect(() => {
  //   handleSetOrders();
  //   console.log("orders.length", orders.length);
  // }, []);

  // useEffect(() => {
  //   handleFilter();
  // }, []);

  // const pageOrders = orders.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  // console.log(currentPage, pageOrders);