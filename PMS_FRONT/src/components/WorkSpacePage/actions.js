import axios from "axios";
import * as act from "./constants";
import authHeader from "../../services/auth-header";

export const getProjects = () => async dispatch => {
    let res = await axios.get("http://localhost:8080/project/list", { headers: authHeader() });
  
    dispatch({
        type: act.GET_PROJECTS_FOR_WORKSPACE,
        payload: res.data
    })
  }


  export const setSelectedProject = (project) => (dispatch) => {
    return dispatch({
      type: act.SET_SELECTED_WORKSPACE_PROJECT,
      payload: project
    })
  }

  export const clearSelectedProject = (project) => (dispatch) => {
    return dispatch({
      type: act.CLEAR_SELECTED_WORKSPACE_PROJECT
    })
  }
  