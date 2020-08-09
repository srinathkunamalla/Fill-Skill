import { ACTION_TYPES } from "./constants";

export const initialState = {
  isLoading: false,
  company: {
    id: undefined,
    name: undefined
  },
  directors: [],
  skillset: {},
  columns: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case ACTION_TYPES.SET_COMPANY:
      return {
        ...state,
        company: action.company
      }
    case ACTION_TYPES.SET_DIRECTORS:
      return {
        ...state,
        directors: action.directors
      }
    case ACTION_TYPES.SET_SKILLSET:
      return {
        ...state,
        skillset: action.skillset
      }
    case ACTION_TYPES.SET_COLUMNS:
      return {
        ...state,
        columns: action.columns
      }
    default:
      return state;
  }
};