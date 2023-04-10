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

export const setOpenedTaskName = (name) => (dispatch) => {
    return dispatch({
        type: act.SET_OPENED_TASK_NAME,
        payload: name
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