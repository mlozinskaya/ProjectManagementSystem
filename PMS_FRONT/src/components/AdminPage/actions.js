import axios from "axios";
import * as act from "./constants";
import authHeader from "../../services/auth-header";


export const getProjects = () => async dispatch => {
    let res = await axios.get("http://localhost:8080/project/list", { headers: authHeader() });

    dispatch({
        type: act.GET_PROJECTS,
        payload: res.data
    })
}

export const setProjectName = (name) => (dispatch) => {
    return dispatch({
        type: act.SET_NEW_PROJECT_NAME,
        payload: name
    })
}

export const setSelectedProject = (project) => (dispatch) => {
    return dispatch({
        type: act.SET_SELECTED_PROJECT,
        payload: project
    })
}

export const test = () => async dispatch => {
    const username = "test";
    const password = "123456";
    return axios
      .post("http://localhost:8080/api/test/test", { username, password })
      .then((response) => {
        console.log(response.data);
      });
}