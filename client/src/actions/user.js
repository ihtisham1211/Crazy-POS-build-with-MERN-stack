import axios from "axios";
import { CREATED_USER, FAILED_USER } from "./types";
import { setAlert } from "./alert";

export const createUser = (name, email, password, usertype) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, usertype });

  try {
    const res = await axios.post("/api/user/add", body, config);

    dispatch({
      type: CREATED_USER,
    });

    dispatch(setAlert("User Created", "success"));
  } catch (error) {
    dispatch({
      type: FAILED_USER,
    });
    dispatch(setAlert(error.response.data.error[0].msg, "danger"));
  }
};

export default {};
