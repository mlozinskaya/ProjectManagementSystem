import * as act from "./constants";

const initialState = {
};

export default function main(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
