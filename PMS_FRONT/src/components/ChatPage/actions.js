import axios from "axios";
import * as act from "./constants";
import authHeader from "../../services/auth-header";

export const getMessages = () => async dispatch => {
  let res = await axios.get("http://localhost:8080/chat", { headers: authHeader() });

  res = [].concat(res.data).sort((a, b) => a.id < b.id ? 1 : -1);

  dispatch({
    type: act.GET_MESSAGES,
    payload: res
  })
}

export const addMessage = (message) => async dispatch => {
  await axios
    .post("http://localhost:8080/chat", message)
    .then((response) => {
      dispatch(getMessages());
    });
}

export const removeMessage = (id) => async dispatch => {
  await axios
    .delete("http://localhost:8080/chat/" + id)
    .then((response) => {
      dispatch(getMessages());
    });
}