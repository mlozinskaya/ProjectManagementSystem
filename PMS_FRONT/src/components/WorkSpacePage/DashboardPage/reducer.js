import * as act from "./constants";

const initialState = {
    tasks: []
};

export default function dashboard(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case act.GET_DASHBOARD_TASKS:
            return {
                ...state,
                tasks: payload
            };

        default:
            return { ...state };
    }
}