import axios from "axios";
import * as act from "./constants";
import authHeader from "../../services/auth-header";

export const getThemes = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/forum", { headers: authHeader() });

  dispatch({
    type: act.GET_FORUM_THEMES,
    payload: res.data
  })
}

export const addTheme = (theme) => async dispatch => {
  return await axios.post("http://localhost:8080/forum/add", theme);
}

export const getTheme = (id) => async dispatch => {
  axios.get("http://localhost:8080/forum/theme/" + id, { headers: authHeader() })
    .then((response) => {
      dispatch({
        type: act.SET_FORUM_THEME,
        payload: response.data
      })
    });
}

export const getThemeDispatch = (id) => async dispatch => {
  return axios.get("http://localhost:8080/forum/theme/" + id, { headers: authHeader() });
}

export const addReply = (reply) => async dispatch => {
  await axios
    .post("http://localhost:8080/forum/theme/reply", reply)
    .then((response) => {
      dispatch(getTheme(reply.theme.id));
    });
}


export const removeTheme = (id) => (dispatch) => {
  return axios
    .delete("http://localhost:8080/forum/theme/" + id)
    .then(() => {
      dispatch({
        type: act.CLEAR_THEME
      })
    });
}

export const clearTheme = () => (dispatch) => {
  return dispatch({
    type: act.CLEAR_THEME
  })
}

export const setTitle = (title) => (dispatch) => {
  return dispatch({
    type: act.SET_TITLE,
    payload: title
  })
}

export const setText = (text) => (dispatch) => {
  return dispatch({
    type: act.SET_TEXT,
    payload: text
  })
}

export const removeReply = (reply) => async dispatch => {
  await axios
    .delete("http://localhost:8080/forum/theme/reply/" + reply.id)
    .then((response) => {
      dispatch(getTheme(reply.themeId));
    });
}