import * as act from "./constants";

const initialState = {
  docs: [],
  openedDoc: {},
  sections: []
};

export default function confluence(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case act.GET_CONFLUENCE_SECTIONS:
      return {
        ...state,
        sections: payload
      };

    case act.SET_CONFLUENCE_FILTER:
      return {
        ...state,
        filter: payload
      };

    case act.CLEAR_CONFLUENCE_FILTER:
      return {
        ...state,
        filter: null
      };

    case act.SET_CONFLUENCE_OPENED_DOC:
      return {
        ...state,
        openedDoc: payload
      };

    case act.SET_CONFLUENCE_OPENED_DOC_NAME:
      return {
        ...state,
        openedDoc: {
          ...state.openedDoc,
          name: payload
        }
      };

    case act.SET_CONFLUENCE_OPENED_DOC_SECTION:
      return {
        ...state,
        openedDoc: {
          ...state.openedDoc,
          sectionId: payload
        }
      };

    case act.SET_CONFLUENCE_OPENED_DOC_TAGS:
      return {
        ...state,
        openedDoc: {
          ...state.openedDoc,
          tags: payload
        }
      };

    case act.SET_CONFLUENCE_OPENED_DOC_DESCRIPTION:
      return {
        ...state,
        openedDoc: {
          ...state.openedDoc,
          description: payload
        }
      };

    case act.CLEAR_CONFLUENCE_OPENED_DOC:
      return {
        ...state,
        openedDoc: {
        }
      };


    default:
      return state;
  }
}
