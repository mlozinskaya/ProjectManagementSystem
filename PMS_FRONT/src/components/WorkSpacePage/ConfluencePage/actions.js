import axios from "axios";
import * as act from "./constants";
import authHeader from "../../../services/auth-header";
import { history } from '../../../helpers/history';

const API_URL = "http://localhost:8080/confluence";

export const getConfluenceDocs = () => async dispatch => {
    let res = await axios.get(API_URL + "/list", { headers: authHeader() });

    dispatch({
        type: act.GET_CONFLUENCE_DOCS,
        payload: res.data
    })
}