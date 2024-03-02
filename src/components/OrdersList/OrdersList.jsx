import React, { useEffect, useState } from "react";
import "./OrdersList.css";
import OrderItem from "../OrderItem/OrderItem";
import { MainApi } from "../../utils/api";
import Filter from "../Filter/Filter";

const OrdersList = () => {
  const [orders, setOrders] = useState([]); //все товары
  const [pageOrders, setPageOrders] = useState([]); //товары, отображаемые на странице
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(null); //главный фильтр "brand"
  const [selectedFilterPositions, setSelectedFilterPositions] = useState([]); //сюда загружаем позиции фильтра
  const [selectedPosition, setSelectedPosition] = useState(null); //младший фильтр "Bvlgari"
  // const [selectedFilterItem, setSelectedFilterItem] = useState(null); //младший фильтр "Bvlgari"
  const [displayedPages, setDisplayedPages] = useState([]); //отображаемые страницы

  const handleSetOrders = () => {
    MainApi.getIds(0)
      .then((res) => {
        if (res) {
          MainApi.getItems(res.result)
            .then((res) => {
              console.log("res get items", res);
              const uniqueOrders = res.result.reduce((acc, order) => {
                if (
                  !acc.some((existingOrder) => existingOrder.id === order.id)
                ) {
                  acc.push(order);
                }
                return acc;
              }, []);

              setOrders(uniqueOrders);
              console.log("uniqueOrders", uniqueOrders.length);
            })
            .catch((err) => console.log(err));
        } else {
          console.log("че-т не то с res");
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
    console.log("orders.length", orders.length);
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

  //C.FDJMIVOL;D

  useEffect(() => {
    setPageOrders(
      orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );
    //console.log(currentPage, pageOrders); ЕСЛИ ВКЛЮЧИШЬ УМРЕШЬ ОТ КОЛИЧЕСТВА КОНСОЛЕЙ
  }, [orders, currentPage, itemsPerPage]);

  //ФИЛЬТРАЦИЯ

  const filterNull = (arr) => {
    return arr.filter((element) => element !== null);
  };
  const filterUnique = (arr) => {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };
  const getPosition = (arr, state) => {
    return arr.find((item) => item === state);
  };

  const handleFilter = (selectedFilter) => {
    MainApi.getFields(selectedFilter).then((res) => {
      if (res) {
        const filteredRes = filterUnique(filterNull(res.result));
        //console.log('фильтрованный результат: список брендов', filteredRes);
        setSelectedFilterPositions(filteredRes);
        console.log(
          "список брендов после сетСелектедФильтрПозишнс",
          selectedFilterPositions
        );

        if (selectedPosition !== null) {
          //const selectedBrandItem = getPosition(filteredRes, selectedPosition);
          // const help = (selectedPosition) => {
          //   if (selectedPosition === "price") {
          //     return selectedPosition.toNumber()
          //   } else {
          //     return selectedPosition
          //   }
          // }
          //const selectedBrandItem = selectedPosition;
          console.log('selectedBrandItem', selectedPosition, typeof selectedPosition);
  
          MainApi.getFilteredItems(selectedFilter, selectedPosition).then(
            (res) => {
              console.log("филтеред итемс", selectedPosition);
              MainApi.getItems(res.result).then((res) => {
                console.log("гет  итемс после фильтра", res.result); //массив из 45 элементов, всё ок
                setOrders(res.result);
                console.log(orders); //все еще 8к
              });
            }
          );
        } else {
          console.log('не выбран мелкий фильтр')
        }
      } else {
        console.log("не так");
      }
    });
  };

  useEffect(() => {
    if (selectedFilter !== null) {
      handleFilter(selectedFilter);
      console.log("после хендла", selectedFilter);
    }
  }, [selectedFilter]);

  const handleOptionSelect = (filter) => {
    setSelectedFilter(filter);
    //handleFilter(filter);
    console.log("после хендла", selectedFilter);
  };

  useEffect(() => {
    if (selectedPosition !== null) {
      handleFilter(selectedFilter);
      console.log("после хендла юз эф", selectedPosition);
    }
  }, [selectedPosition]);

  const handlePositionSelect = (filter) => {
    setSelectedPosition(filter);
    //handleFilter(filter);
    console.log("после хендла позишн селект", selectedPosition);
  };

  return (
    <section>
      <div>
        <select onChange={(e) => handleOptionSelect(e.target.value)}>
          <option value="brand">Бренд</option>
          <option value="price">Цена</option>
          <option value="product">Название</option>
        </select>

        {selectedFilter && (
          <select onChange={(e) => handlePositionSelect(e.target.value)}>
            {selectedFilterPositions.map((option, index) => {
          return <option key={index} value={option}>{option}</option>
        })}
          </select>
        )}
      </div>
      {/* <Filter handleOptionSelect={handleOptionSelect} selectedFilter={selectedFilter} /> */}
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
