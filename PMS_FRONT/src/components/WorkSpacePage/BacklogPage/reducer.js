import * as act from "./constants";

const initialState = {
  filter: null,
  viewType: "ALL",
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

    case act.SET_BACKLOG_FILTER:
      return {
        ...state,
        filter: payload
      };

    case act.CLEAR_BACKLOG_FILTER:
      return {
        ...state,
        filter: null
      };

    case act.SET_BACKLOG_VIEW_TYPE:
      return {
        ...state,
        viewType: payload
      };

    case act.SET_BACKLOG_OPENED_TASK:
      return {
        ...state,
        openedTask: payload
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

    case act.SET_OPENED_TASK_TYPE:
      return {
        ...state,
        openedTask: {
          ...state.openedTask,
          type: payload
        }
      };

    case act.SET_OPENED_TASK_STATUS:
      return {
        ...state,
        openedTask: {
          ...state.openedTask,
          status: payload
        }
      };

    case act.SET_OPENED_TASK_SUMMARY:
      return {
        ...state,
        openedTask: {
          ...state.openedTask,
          summary: payload
        }
      };

    case act.SET_OPENED_TASK_DESCRIPTION:
      return {
        ...state,
        openedTask: {
          ...state.openedTask,
          description: payload
        }
      };

    case act.SET_OPENED_TASK_ASSING_TO:
      return {
        ...state,
        openedTask: {
          ...state.openedTask,
          userId: payload
        }
      };


    default:
      return state;
  }
}
