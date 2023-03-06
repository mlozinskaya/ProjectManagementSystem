import SET_SESSION_SELECTED_PROJECT from "./constants";


export const setSelectedProject = (project) => (dispatch) => {
    return dispatch({
      type: SET_SESSION_SELECTED_PROJECT,
      payload: project
    })
  }
