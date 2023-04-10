import * as act from "./constants";

const initialState = {
    projects: [],
    openedProject: {
        name: null
    },
    users: [],
    openedUser: {}
};

export default function adminPage(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case act.GET_PROJECTS_FOR_ADMIN:
            return {
                ...state,
                projects: payload
            };

        case act.SET_OPENED_PROJECT: {
            return {
                ...state,
                openedProject: payload
            };
        }
        case act.CLEAR_OPENED_PROJECT: {
            return {
                ...state,
                openedProject: {}
            };
        }
        case act.SET_OPENED_PROJECT_NAME:
            return {
                ...state,
                openedProject: {
                    ...state.openedProject,
                    name: payload
                }
            };
        case act.SET_OPENED_PROJECT_KEY:
            return {
                ...state,
                openedProject: {
                    ...state.openedProject,
                    key: payload
                }
            };
        case act.SET_OPENED_PROJECT_LEAD:
            return {
                ...state,
                openedProject: {
                    ...state.openedProject,
                    lead: payload
                }
            };

        case act.GET_USERS_FOR_ADMIN:
            return {
                ...state,
                users: payload
            };
        default:
            return state;
    }
}
