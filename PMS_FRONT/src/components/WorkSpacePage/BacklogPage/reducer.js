import * as act from "./constants";

const initialState = {
  tasks: []
};

export default function backlog(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    default:
      return state;
  }
}
