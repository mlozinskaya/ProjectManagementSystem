import * as act from "./constants";

const initialState = {
  tasks: [],
  openedTask: {}
};

export default function backlog(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case act.GET_BACKLOG_TASKS:
      return {
        ...state,
        tasks: payload
      };

    case act.CLEAR_OPENED_TASK:
      return {
        ...state,
        openedTask: {}
      };

    case act.SET_OPENED_TASK_NAME:
      return {
        ...state,
        openedTask: {
          ...state.openedTask,
          name: payload
        }
      };

    default:
      return state;
  }
}
