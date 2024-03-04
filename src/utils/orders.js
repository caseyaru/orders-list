export const filterUniqueOrders = (arr) => {
  return arr.reduce((acc, order) => {
    if (!acc.some((existingOrder) => existingOrder.id === order.id)) {
      acc.push(order);
    }
    return acc;
  }, []);
};

//отвесивание с несоответствием null
export const filterNull = (arr) => {
  return arr.filter((element) => element !== null);
};

//отсеивание по уникальности
export const filterUnique = (arr) => {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
};
