export const addToCart = (book) => {
  return {
    type: "ADD_TO_CART",
    payload: book,
  };
};

export const updateQuantity = (itemId, quantity) => ({
  type: "UPDATE_QUANTITY",
  payload: { itemId, quantity },
});

export const resetBookQuantity = (bookId) => ({
  type: "RESET_BOOK_QUANTITY",
  payload: bookId,
});

export const clearBookFromCart = (itemId) => ({
  type: "CLEAR_BOOK_FROM_CART",
  payload: itemId,
});
