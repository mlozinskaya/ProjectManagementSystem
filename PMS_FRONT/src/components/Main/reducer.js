import SET_SESSION_SELECTED_PROJECT from "./constants";

const initialState = {
  projects: ["UOD", "ETU", "SBER", "AVITO"],
  selectedProject: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SESSION_SELECTED_PROJECT:
      return { ...state, selectedProject: payload };

    default:
      return state;
  }
}
