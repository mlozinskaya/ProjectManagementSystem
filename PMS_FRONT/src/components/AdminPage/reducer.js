import * as act from "./constants";

const initialState = {
    projects: [],
    project: {
        name: null
    },
    selectedProject: null,
    submitFormMode: null
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

        case act.SET_NEW_PROJECT: {
            return {
                ...state,
                project: action.payload
            };
        }
        case act.CLEAR_NEW_PROJECT: {
            return {
                ...state,
                project: {

                }
            };
        }
        
        case act.SET_NEW_PROJECT_NAME:
            return {
                ...state,
                project: {
                    ...state.project,
                    name: action.payload
                }
            };

        case act.SET_NEW_PROJECT_KEY:
            return {
                ...state,
                project: {
                    ...state.project,
                    key: action.payload
                }
            };

        case act.SET_NEW_PROJECT_LEAD:
            return {
                ...state,
                project: {
                    ...state.project,
                    lead: action.payload
                }
            };

        case act.CLEAN_NEW_PROJECT_FORM:
            return {
                ...state,
                project: {
                }
            };

        case act.SET_SUBMIT_FORM_MODE:
            return {
                ...state,
                submitFormMode: action.payload
            };

        case act.CLEAR_SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: null
            }
        default:
            return state;
    }
}
