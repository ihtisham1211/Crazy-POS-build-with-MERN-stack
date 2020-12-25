import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_FROM_CART,
} from "../actions/types";

const initialState = {
  checkoutList: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //action has the coming data init
  switch (type) {
    case ADD_PRODUCT_TO_CART:
      const ind = state.checkoutList.findIndex(
        (item) => item.id === payload.id
      );
      let copy = [...state.checkoutList];
      if (ind >= 0) {
        copy[ind].qtn = parseInt(copy[ind].qtn) + 1;
        return {
          ...state,
          checkoutList: copy,
        };
      }
      return { ...state, checkoutList: [...state.checkoutList, payload] };

    case DELETE_PRODUCT_FROM_CART:
      const index = state.checkoutList.findIndex(
        (checkoutItem) => checkoutItem.id === payload
      );
      let copyState = [...state.checkoutList];

      if (index >= 0 && copyState[index].qtn === 1) {
        copyState.splice(index, 1);
      } else {
        copyState[index].qtn = copyState[index].qtn - 1;
      }
      return {
        ...state,
        checkoutList: copyState,
      };
    case UPDATE_PRODUCT_FROM_CART:
      return { checkoutList: [] };
    default:
      return state;
  }
}
