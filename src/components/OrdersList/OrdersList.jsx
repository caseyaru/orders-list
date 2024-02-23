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
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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

  const handleNextPage = () => {
    if (currentPage < Math.ceil(orders.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
      {currentOrders.length && (
        <div className="pagination">
          <button onClick={handlePrevPage} className="pagination__button">
            Назад
          </button>
          {displayedPages.map((page) => (
            <button
              key={page}
              onClick={() => handleClick(page)}
              className="pagination__button pagination__button_type_number"
            >
              {page}
            </button>
          ))}
          <button onClick={handleNextPage} className="pagination__button">
            Дальше
          </button>
        </div>
      )}
    </section>
  );
};

export default OrdersList;
