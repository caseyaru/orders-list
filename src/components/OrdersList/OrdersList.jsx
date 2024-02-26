import React, { useEffect, useState } from "react";
import "./OrdersList.css";
import OrderItem from "../OrderItem/OrderItem";
import { MainApi } from "../../utils/api";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSetOrders = () => {
    MainApi.getIds(0)
      .then((res) => {
        if (res) {
          MainApi.getItems(res.result)
            .then((res) => {
              //console.log("res get items", res);
              const uniqueOrders = res.result.reduce((acc, order) => {
                if (!acc.some((existingOrder) => existingOrder.id === order.id)) {
                  acc.push(order);
                }
                return acc;
              }, []);
        
              setOrders(uniqueOrders);
              console.log('uniqueOrders', uniqueOrders.length)
            })
            .catch((err) => console.log(err));
        } else {
          console.log("че-т не то с res");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleSetOrders();
    console.log('orders.length', orders.length)
  }, []);

  //ПАГИНАЦИЯ
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    updateDisplayedPages(currentPage, orders, itemsPerPage);
  }, [currentPage, orders]);

  const updateDisplayedPages = (page, orders, itemsPerPage) => {
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

  const pageOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  console.log(currentPage, pageOrders)

  return (
    <section>
      <ul className="list">
        {pageOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
      {pageOrders.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrevPage} className="pagination__button">
            Назад
          </button>
          {displayedPages.map((page) => (
            <button
              key={page}
              onClick={() => handleClick(page)}
              className={`pagination__button pagination__button_type_number ${
                page === currentPage ? "pagination__button_active" : ""
              }`}
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
