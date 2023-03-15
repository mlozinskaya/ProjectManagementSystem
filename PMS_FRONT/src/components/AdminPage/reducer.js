import * as act from "./constants";

const initialState = {
    projects: [],
    project: {
        name: null
    },
    selectedProject: null
};

export default function adminPage(state = initialState, action) {
    const { type, payload } = action;

    switch (action.type) {
        case act.GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case act.SET_SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: action.payload
            };

        case act.SET_NEW_PROJECT_NAME:
            return {
                ...state,
                project: {
                    ...state.project,
                    name: action.payload
                }
            };

        default:
            return state;
    }
}
