import { CREATED_USER, FAILED_USER } from "../actions/types";
const initialState = { created: false };

export default function (state = initialState, action) {
  const { type } = action;
  //action has the coming data init
  switch (type) {
    case CREATED_USER:
      return {
        ...state,
        created: true,
      };
    case FAILED_USER:
      return {
        ...state,
        created: false,
      };
    default:
      return state;
  }
}
