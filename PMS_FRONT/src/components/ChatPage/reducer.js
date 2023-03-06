import * as act from "./constants";

const initialState = {
  messages: []
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case act.GET_MESSAGES: {
      return {
        ...state,
        messages: action.payload
      }
    }

    default:
      return state;
  }
}
