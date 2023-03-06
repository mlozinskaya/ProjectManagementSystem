import * as act from "./constants";

const initialState = {
  themes: [],
  theme: {
    id: null,
    title: "",
    text: "",
    validated: false
  }
};

export default function forum(state = initialState, action) {
  switch (action.type) {
    case act.GET_FORUM_THEMES: {
      return {
        ...state,
        themes: action.payload
      }
    }

    case act.SET_FORUM_THEME: {
      return {
        ...state,
        theme: action.payload
      }
    }

    case act.CLEAR_THEME: {
      return {
        ...state,
        theme: {}
      }
    }

    case act.SET_TITLE: {
      return {
        ...state,
        theme: {
          ...state.theme,
          title: action.payload
        }
      }
    }

    case act.SET_TEXT: {
      return {
        ...state,
        theme: {
          ...state.theme,
          text: action.payload
        }
      }
    }

    default:
      return state;
  }
}
