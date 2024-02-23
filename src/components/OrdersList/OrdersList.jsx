import React, { useEffect, useState } from "react";
import "./OrdersList.css";
import OrderItem from "../OrderItem/OrderItem";
import { MainApi } from "../../utils/api";

const OrdersList = () => {

  const [orders, setOrders] = useState([]);
  const [displayedPages, setDisplayedPages] = useState([]);
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleSetOrders();
  }, []);

  const handleSetOrders = () => {
    MainApi.getIds(0, 200)
      .then((res) => {
        console.log("res get ids", res);
        MainApi.getItems(res.result)
          .then((res) => {
            console.log("res get items", res);
            setOrders(res.result);
          })
          .catch(() => console.log("не прогрузились итемы"));
      })
      .catch(() => console.log("не прогрузились айди"));
  };

  useEffect(() => {
    updateDisplayedPages(currentPage);
  }, [currentPage, orders]);

  const updateDisplayedPages = (page) => {
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    let startPage = Math.max(1, page - 5);
    let endPage = Math.min(totalPages, startPage + 9);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setDisplayedPages(pages);
  };

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <section>
      <ul className="list">
        {currentOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
      <div className="pagination">
        {displayedPages.map((page) => (
                <button key={page} onClick={() => handleClick(page)}>
                    {page}
                </button>
            ))}
      </div>
    </section>
  );
};

export default OrdersList;
