import React, { useEffect, useState } from "react";

const Filter = ({ handleOptionSelect, selectedFilter }) => {


  return (
    <div>
    <select onChange={(e) => handleOptionSelect(e.target.value)}>
      <option value="brand">Бренд</option>
      <option value="price">Цена</option>
      <option value="name">Название</option>
    </select>
    
    {selectedFilter === "brand" && (
      <select>
        {/* {filterPositions.map((option, index) => {
          return <option key={index} value={option}>{option}</option>
        })} */}
      </select>
    )}
    
    {selectedFilter === "price" && (
      <select>
        <option value="1000">До 1000</option>
        <option value="2000">До 2000</option>
      </select>
    )}
    
    {selectedFilter === "name" && (
      <select>
        <option value="aa">АА</option>
        <option value="bb">ББ</option>
      </select>
    )}
  </div>
    )
};

export default Filter;
