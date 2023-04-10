import * as act from "./constants";

const initialState = {
  docs: [],
  openedDoc: {}
};

export default function confluence(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case act.GET_CONFLUENCE_DOCS:
      return {
        ...state,
        docs: payload
      };

    default:
      return state;
  }
}
