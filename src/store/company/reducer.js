import { ACTION_TYPES } from "./constants";

const initialState = {
  isLoading: false,
  company: {
    id: undefined,
    name: undefined
  },
  directors: [],
  managers: [],
  selectedDirector: undefined,
  selectedManageer: undefined
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
      };
    case ACTION_TYPES.SET_MANAGERS:
      return {
        ...state,
        managers: action.managers
      };
    case ACTION_TYPES.SET_SELECTED_DIRECTOR:
      return {
        ...state,
        selectedDirector: action.selectedDirector
      };
    case ACTION_TYPES.SET_SELECTED_MANAGER:
      return {
        ...state,
        selectedManageer: action.selectedManageer
      };
    default:
      return state;
  }
};