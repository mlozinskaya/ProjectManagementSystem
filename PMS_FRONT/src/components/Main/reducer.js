import * as act from "./constants";

const initialState = {
  projects: [],
  selectedProject: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case act.GET_PROJECTS:
      return {
          ...state,
          projects: action.payload
      };

    case act.SET_SESSION_SELECTED_PROJECT:
      return { ...state, selectedProject: payload };

    default:
      return state;
  }
}
