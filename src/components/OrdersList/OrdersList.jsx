import React, { useEffect, useState } from "react";
import "./OrdersList.css";
import OrderItem from "../OrderItem/OrderItem";
import { MainApi } from "../../utils/api";
import Pagination from "../Pagination/Pagination";

// const orders = [
//     {
//         brand: 'dsfgzfg',
//         id: 'adsf',
//         price: 123,
//         product: 'text about alllll',
//     },
//     {
//         brand: 'asdfa',
//         id: 'wqadf',
//         price: 123,
//         product: 'text about thisss',
//     },
//     {
//         brand: 'fff',
//         id: 'dgrstgdf',
//         price: 123,
//         product: 'text about ffff',
//     },
// ]

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  //РЕАЛИЗАЦИЯ СПИСКА

  const handleSetOrders = () => {
    MainApi.getIds(0, 600)
      .then((res) => {
        console.log("res get ids", res);
        //console.log("res get ids + result", res.result);
        MainApi.getItems(res.result)
          .then((res) => {
            console.log("res get items", res);
            //console.log("res get items + result", res.result);
            setOrders(res.result);
          })
          .catch(() => console.log("не прогрузились итемы"));
      })
      .catch(() => console.log("не прогрузились айди"));
  };

  //РЕАЛИЗАЦИЯ ПАГИНАЦИИ
  const itemsPerPage = 50; // количество элементов на одной странице

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const startNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    updateDisplayedPages(currentPage);
  }, [currentPage]);

  const updateDisplayedPages = (page) => {
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

  useEffect(() => {
    handleSetOrders(currentOrders);
  }, [currentPage]);

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
