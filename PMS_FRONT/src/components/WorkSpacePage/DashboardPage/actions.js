import axios from "axios";
import * as act from "./constants";
import authHeader from "../../../services/auth-header";
import { history } from '../../../helpers/history';

const API_URL = "http://localhost:8080/dashboard";

export const getDashboardTasks = (projectId) => async dispatch => {
    let res = await axios.get(`${API_URL}/list/${projectId}`, { headers: authHeader() });

    dispatch({
        type: act.GET_DASHBOARD_TASKS,
        payload: res.data
    })
}