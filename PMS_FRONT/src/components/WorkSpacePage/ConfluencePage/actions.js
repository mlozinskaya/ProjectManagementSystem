import axios from "axios";
import * as act from "./constants";
import authHeader from "../../../services/auth-header";
import { history } from '../../../helpers/history';

const API_URL = "http://localhost:8080/confluence";

export const getConfluenceSections = () => async dispatch => {
    let res = await axios.get(API_URL + "/list", { headers: authHeader() });

    dispatch({
        type: act.GET_CONFLUENCE_SECTIONS,
        payload: res.data
    })
}

export const setFilter = (filter) => (dispatch) => {
    return dispatch({
        type: act.SET_CONFLUENCE_FILTER,
        payload: filter
    })
}

export const clearFilter = () => (dispatch) => {
    return dispatch({
        type: act.CLEAR_CONFLUENCE_FILTER
    })
}

export const setOpenedDoc = (doc) => (dispatch) => {
    return dispatch({
        type: act.SET_CONFLUENCE_OPENED_DOC,
        payload: doc
    })
}

export const setOpenedDocName = (name) => (dispatch) => {
    return dispatch({
        type: act.SET_CONFLUENCE_OPENED_DOC_NAME,
        payload: name
    })
}

export const setOpenedDocSection = (section) => (dispatch) => {
    return dispatch({
        type: act.SET_CONFLUENCE_OPENED_DOC_SECTION,
        payload: section
    })
}

export const setOpenedDocTags = (tags) => (dispatch) => {
    return dispatch({
        type: act.SET_CONFLUENCE_OPENED_DOC_TAGS,
        payload: tags
    })
}

export const setOpenedDocDescription = (description) => (dispatch) => {
    return dispatch({
        type: act.SET_CONFLUENCE_OPENED_DOC_DESCRIPTION,
        payload: description
    })
}

export const clearOpenedDoc = () => (dispatch) => {
    return dispatch({
        type: act.CLEAR_CONFLUENCE_OPENED_DOC
    })
}

export const saveDoc = (doc) => async dispatch => {
    return axios
        .post(API_URL + "/save", doc, { headers: authHeader() })
        .then((response) => {
            if (response.status === 200) {
                dispatch(clearOpenedDoc());
                history.push("/confluence");
            }
        });
}