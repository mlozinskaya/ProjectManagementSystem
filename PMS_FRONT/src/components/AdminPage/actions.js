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

export const setProjectForEdit = (project) => (dispatch) => {
    return dispatch({
        type: act.SET_NEW_PROJECT,
        payload: project
    })
}

export const clearEditProjectForm = () => (dispatch) => {
    return dispatch({
        type: act.CLEAR_NEW_PROJECT
    })
}

export const setProjectName = (name) => (dispatch) => {
    return dispatch({
        type: act.SET_NEW_PROJECT_NAME,
        payload: name
    })
}

export const setProjectKey = (key) => (dispatch) => {
    return dispatch({
        type: act.SET_NEW_PROJECT_KEY,
        payload: key
    })
}
export const setProjectLead = (lead) => (dispatch) => {
    return dispatch({
        type: act.SET_NEW_PROJECT_LEAD,
        payload: lead
    })
}

export const setSelectedProject = (project) => (dispatch) => {
    return dispatch({
        type: act.SET_SELECTED_PROJECT,
        payload: project
    })
}

export const saveProject = (project) => async dispatch => {
    return axios
        .post(API_URL + "/save", project, { headers: authHeader() })
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: act.CLEAN_NEW_PROJECT_FORM
                });
                dispatch(clearSelectedProject())
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

export const setSubmitFormMode = (mode) => (dispatch) => {
    return dispatch({
        type: act.SET_SUBMIT_FORM_MODE,
        payload: mode
    })
}

export const clearSelectedProject = () => (dispatch) => {
    return dispatch({
        type: act.CLEAR_SELECTED_PROJECT
    })
}