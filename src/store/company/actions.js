import { ACTION_TYPES } from "./constants"
import { Companies } from "../../api/companies"
import { Directors } from "../../api/directors"

// setters
export const setIsLoading = (isLoading) => {
  return {
    type: ACTION_TYPES.SET_IS_LOADING,
    isLoading
  }
}
export const setCompany = (company) => {
  return {
    type: ACTION_TYPES.SET_COMPANY,
    company
  }
}
export const setDirectors = (directors) => {
  return {
    type: ACTION_TYPES.SET_DIRECTORS,
    directors
  }
}
export const setSkillset = (skillset) => {
  return {
    type: ACTION_TYPES.SET_SKILLSET,
    skillset
  }
}


// actions
export const getCompany = (username) => {
  return async (dispatch, getState, context) => {
    try {
      dispatch(setIsLoading(true))
      const company = await Companies.read(username)
      dispatch(setCompany({
        id: company.id,
        name: company.name
      }))
      dispatch(setSkillset(company.skillset))
      console.log(getState())
      return company
    } catch(e) {
      alert("Error loading company data.")
    } finally {
      dispatch(setIsLoading(false))
    }
   
  }
}
export const getDirectors = () => {
  return async (dispatch, getState, context) => {
    try {
      dispatch(setIsLoading(true))
      const directors = await Directors.getAll(getState().company.id)
      dispatch(setDirectors(directors))
      console.log(getState())
    } catch(e) {
      alert("Error loading company data.")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}