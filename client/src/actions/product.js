import axios from "axios";
import { GET_PRODUCT } from "./types";
import { setAlert } from "./alert";

// ADD  PRODUCT
export const addProduct = (
  name,
  price,
  quantity,
  brand,
  category,
  productimg,
  token
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({
    name,
    price,
    quantity,
    brand,
    category,
    productimg,
  });
  try {
    const res = await axios.post("api/product/add", body, config);
    dispatch(catchProduct());
    dispatch(setAlert("Product Created ", "success"));
    console.log("addProduct");
  } catch (error) {
    dispatch(setAlert("Failed to create product", "danger"));
  }
};

//get products
export const catchProduct = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {};
  try {
    const res = await axios.get("api/product", body, config);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
    console.log("catchProduct");
  } catch (error) {
    dispatch(setAlert("Failed to load product", "danger"));
  }
};
// delete product
export const deleteProduct = (token, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = {};
  try {
    const res = await axios.delete("api/product/" + id, body, config);
    dispatch(catchProduct());
    console.log("deleteProduct");
  } catch (error) {
    dispatch(setAlert("Failed to delete product", "danger"));
  }
};

// update Product
export const updateProduct = (
  id,
  name,
  price,
  quantity,
  brand,
  category,
  token
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({
    name,
    price,
    quantity,
    brand,
    category,
  });
  try {
    const res = await axios.patch("api/product/" + id, body, config);
    dispatch(catchProduct());
    dispatch(setAlert("Product Updated ", "success"));
    console.log("updateProduct");
  } catch (error) {
    dispatch(setAlert("Failed to Update product", "danger"));
  }
};
// update checkout Product
export const updatecheckoutProduct = (
  id,
  name,
  price,
  quantity,
  brand,
  category,
  token
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({
    name,
    price,
    quantity,
    brand,
    category,
  });
  try {
    const res = await axios.patch("api/product/" + id, body, config);
    console.log("updatecheckoutProduct");
  } catch (error) {
    dispatch(setAlert("Failed to Update product", "danger"));
  }
};
