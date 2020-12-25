import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

//payload is the comming data and State is the variables in this file
export default function (state = initialState, action) {
  const { type, payload } = action;
  //action has the coming data init
  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
}
