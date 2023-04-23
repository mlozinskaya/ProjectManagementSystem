import axios from "axios";
import * as act from "./constants";
import authHeader from "../../../services/auth-header";
import { history } from '../../../helpers/history';

const API_URL = "http://localhost:8080/backlog";

export const getBacklogTasks = (projectId) => async dispatch => {
    let res = await axios.get(`${API_URL}/list/${projectId}`, { headers: authHeader() });

    dispatch({
        type: act.GET_BACKLOG_TASKS,
        payload: res.data
    })
}

export const setFilter = (filter) => (dispatch) => {
    return dispatch({
        type: act.SET_BACKLOG_FILTER,
        payload: filter
    })
}

export const clearFilter = () => (dispatch) => {
    return dispatch({
        type: act.CLEAR_BACKLOG_FILTER
    })
}

export const setViewType = (viewType) => (dispatch) => {
    return dispatch({
        type: act.SET_BACKLOG_VIEW_TYPE,
        payload: viewType
    })
}

export const setOpenedTask = (task) => (dispatch) => {
    return dispatch({
        type: act.SET_BACKLOG_OPENED_TASK,
        payload: task
    })
}

export const setOpenedTaskName = (name) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_TASK_NAME,
        payload: name
    })
}

export const setOpenedTaskType = (type) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_TASK_TYPE,
        payload: type
    })
}

export const setOpenedTaskStatus = (status) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_TASK_STATUS,
        payload: status
    })
}


export const setOpenedTaskSummary = (summary) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_TASK_SUMMARY,
        payload: summary
    })
}

export const setOpenedTaskDescription = (description) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_TASK_DESCRIPTION,
        payload: description
    })
}

export const setOpenedTaskAssingTo = (user_id) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_TASK_ASSING_TO,
        payload: user_id
    })
}

export const clearOpenedTask = () => (dispatch) => {
    return dispatch({
        type: act.CLEAR_OPENED_TASK
    })
}

export const saveTask = (task) => async dispatch => {
    return axios
        .post(API_URL + "/save", task, { headers: authHeader() })
        .then((response) => {
            if (response.status === 200) {
                dispatch(clearOpenedTask());
                history.push("/backlog");
            }
        });
}