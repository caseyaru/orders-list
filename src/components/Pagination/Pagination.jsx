import React, { useEffect, useState } from "react"

const Pagination = ({orders}) => {

    const itemsPerPage = 50; // количество элементов на одной странице

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

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

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="pagination">
        {/* {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handleClick(index + 1)}>
            {index + 1}
          </button>
        ))} */}
        {displayedPages.map((page) => (
                <button key={page} onClick={() => handleClick(page)}>
                    {page}
                </button>
            ))}
      </div>
  )
};

export default Pagination;
