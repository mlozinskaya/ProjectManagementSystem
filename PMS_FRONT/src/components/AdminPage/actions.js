import axios from "axios";
import * as act from "./constants";
import authHeader from "../../services/auth-header";
import { history } from '../../helpers/history';

const API_URL = "http://localhost:8080/project";

export const getProjects = () => async dispatch => {
    let res = await axios.get(API_URL + "/list", { headers: authHeader() });

    dispatch({
        type: act.GET_PROJECTS,
        payload: res.data
    })
}

export const setOpenedProject = (project) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_PROJECT,
        payload: project
    })
}

export const clearOpenedProject = () => (dispatch) => {
    return dispatch({
        type: act.CLEAR_OPENED_PROJECT
    })
}

export const setProjectName = (name) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_PROJECT_NAME,
        payload: name
    })
}

export const setProjectKey = (key) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_PROJECT_KEY,
        payload: key
    })
}
export const setProjectLead = (lead) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_PROJECT_LEAD,
        payload: lead
    })
}

export const saveProject = (project) => async dispatch => {
    return axios
        .post(API_URL + "/save", project, { headers: authHeader() })
        .then((response) => {
            if (response.status === 200) {
                dispatch(clearOpenedProject());
                history.push("/admin/projects");
            }
        });
}

export const removeProject = (project) => async dispatch => {
    return axios
        .post(API_URL + "/remove", project, { headers: authHeader() })
        .then((response) => {
            if (response.status === 200) {
                dispatch(getProjects());
            }
        });
}