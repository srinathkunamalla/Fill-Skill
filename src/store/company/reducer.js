import { ACTION_TYPES } from "./constants";

const initialState = {
  company: undefined,
  directors: [],
  managers: [],
  // director: [],
  // currentManager: [],

}

export default (state = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPES.TEST:
      return action.payload;
    default:
      return state;
  }
};