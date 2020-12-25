import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_FROM_CART,
} from "./types";
import { setAlert } from "./alert";

// add to cart
export const addToCart = (item) => async (dispatch) => {
  try {
    console.log("addToCart");
    dispatch({ type: ADD_PRODUCT_TO_CART, payload: item });
  } catch (error) {
    dispatch(setAlert("Failed to add item to cart", "danger"));
  }
};
export const deletefromCart = (id) => async (dispatch) => {
  try {
    console.log("deletefromCart");
    dispatch({ type: DELETE_PRODUCT_FROM_CART, payload: id });
  } catch (error) {
    dispatch(setAlert("Failed to remove item from cart", "danger"));
  }
};

export const checkoutcart = () => async (dispatch) => {
  try {
    console.log("checkoutcart");
    dispatch({ type: UPDATE_PRODUCT_FROM_CART });
  } catch (error) {
    dispatch(setAlert("Failed to Checkout from cart", "danger"));
  }
};
