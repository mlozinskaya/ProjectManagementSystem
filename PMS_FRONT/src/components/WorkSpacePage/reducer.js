import * as act from "./constants";

const initialState = {
    projects: [],
    selectedProject: null
};

export default function workspace(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case act.GET_PROJECTS_FOR_WORKSPACE:
            return {
                ...state,
                projects: payload
            };

        case act.SET_SELECTED_WORKSPACE_PROJECT:
            return {
                ...state,
                selectedProject: payload
            }

        case act.CLEAR_SELECTED_WORKSPACE_PROJECT:
            return {
                ...state,
                selectedProject: null
            }
        default:
            return state;
    }
}
