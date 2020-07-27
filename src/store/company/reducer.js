import { ACTION_TYPES } from "./constants";

export default (state = {}, action) => {
  switch(action.type) {
    case ACTION_TYPES.TEST:
      return action.payload;
    default:
      return state;
  }
};