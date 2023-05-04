import * as act from "./constants";

import AuthService from "./service";

export const register = (username, firstName, secondName, email, password) => (dispatch) => {
  return AuthService.register(username, firstName, secondName, email, password).then(
    (response) => {
      dispatch({
        type: act.REGISTER_SUCCESS,
      });

      dispatch({
        type: act.SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: act.REGISTER_FAIL,
      });

      dispatch({
        type: act.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: act.LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: act.LOGIN_FAIL,
      });

      dispatch({
        type: act.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: act.LOGOUT
  });
};
