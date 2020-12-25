import {
  GET_PRODUCT,
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
} from "../actions/types";

const initialState = {
  productList: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        productList: payload,
      };
    case INCREASE_PRODUCT:
      const index = state.productList.findIndex(
        (productItem) => productItem._id === payload
      );
      let copyState = [...state.productList];
      if (index >= 0) {
        copyState[index].quantity = parseInt(copyState[index].quantity) + 1;
      }
      return {
        ...state,
        productList: copyState,
      };
    case DECREASE_PRODUCT:
      const ind = state.productList.findIndex(
        (productItem) => productItem._id === payload
      );
      let copy = [...state.productList];
      if (ind >= 0) {
        copy[ind].quantity = parseInt(copy[ind].quantity) - 1;
      }
      return {
        ...state,
        productList: copy,
      };
    default:
      return state;
  }
}
