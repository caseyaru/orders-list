import React, { useEffect, useState } from "react";
import "./OrdersList.css";
import OrderItem from "../OrderItem/OrderItem";
import Loader from '../Loader/Loader';
import { MainApi } from "../../utils/api";
import { filterUniqueOrders, filterNull, filterUnique } from "../../utils/orders";

const OrdersList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [orders, setOrders] = useState([]); //все товары
  const [pageOrders, setPageOrders] = useState([]); //товары, отображаемые на странице
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(null); //главный фильтр, нпр "brand"
  const [selectedFilterPositions, setSelectedFilterPositions] = useState([]); //сюда загружаем позиции фильтра
  const [selectedPosition, setSelectedPosition] = useState(null); //младший фильтр, нпр "Bvlgari"
  const [displayedPages, setDisplayedPages] = useState([]); //отображаемые страницы

  const handleSetOrders = () => {
    setIsLoading(true);
    MainApi.getIds(0)
      .then((res) => {
        if (res) {
          MainApi.getItems(res.result)
            .then((res) => {
              const uniqueOrders = filterUniqueOrders(res.result);
              setOrders(uniqueOrders);
              //console.log("uniqueOrders", uniqueOrders.length);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
        } else {
          console.log("Отсутствует ответ сервера");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedFilter === null) {
      handleSetOrders();
    } else {
      handleFilter(selectedFilter);
    }
  }, []);

  //ПАГИНАЦИЯ

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

  useEffect(() => {
    setPageOrders(
      orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );
  }, [orders, currentPage, itemsPerPage]);

  //ФИЛЬТРАЦИЯ

  const handleFilter = (selectedFilter) => {
    setIsLoading(true);
    MainApi.getFields(selectedFilter)
    .then((res) => {
      if (res) {
        const filteredRes = filterUnique(filterNull(res.result));
        //console.log('фильтрованный результат:', filteredRes);
        setSelectedFilterPositions(filteredRes);
        //проверка на наличие младшего фильтра
        if (selectedPosition !== null) {
          //console.log('выбранный фильтр:', selectedPosition);
          MainApi.getFilteredItems(selectedFilter, selectedPosition).then(
            (res) => {
              MainApi.getItems(res.result)
              .then((res) => {
                setOrders(res.result);
              })
              .catch((err) => console.log(err))
              .finally(() => setIsLoading(false));
            }
          );
        } else {
          console.log('Для отбора по фильтру необходимо сначала выбрать младший фильтр')
        }
      } else {
        console.log("Отсутствует ответ сервера");
      }
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (selectedFilter !== null) {
      handleFilter(selectedFilter);
    }
  }, [selectedFilter]);

  const handleOptionSelect = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    if (selectedPosition !== null) {
      handleFilter(selectedFilter);
    }
  }, [selectedPosition]);

  const handlePositionSelect = (filter) => {
    setSelectedPosition(filter);
  };

  return (
    <main>

      <section className="filter">
        <select onChange={(e) => handleOptionSelect(e.target.value)} className="filter__select">
          <option value="brand">Бренд</option>
          <option value="price">Цена</option>
          <option value="product">Название</option>
        </select>
        {selectedFilter && (
          <select onChange={(e) => handlePositionSelect(e.target.value)} className="filter__select">
            {selectedFilterPositions.map((option, index) => {
          return <option key={index} value={option}>{option}</option>
        })}
          </select>
        )}
      </section>

      {isLoading
        ? <Loader />
        : (
            <> 

              <ul className="list">
                {pageOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </ul>

              {pageOrders.length > 0 && (
                <section className="pagination">
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
                </section>
              )}

            </> 
          )
      }
    </main>
  );
};

export default OrdersList;
