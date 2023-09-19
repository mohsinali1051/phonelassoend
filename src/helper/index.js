  export const calculateSubTotal = (items) => {
  let total = 0;
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    const itemPrice = parseFloat(element.price); 
      // eslint-disable-next-line
    total += itemPrice * parseInt(element.quantity);
  }
  return total.toFixed(2);
};

export const calculateTotal = (items, shippingCost) => {
  let total = 0;
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    const itemPrice = parseFloat(element.price); 
    // eslint-disable-next-line
    total += itemPrice * parseInt(element.quantity);
  }
  total += shippingCost;
  return total.toFixed(2);
};

export const calculatePriceWithTwoDecimal = (price) => {
  return price.toFixed(2);
};
