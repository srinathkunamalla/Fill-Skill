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

      return company
    } catch(e) {
      console.log(e)
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
    } catch(e) {
      alert("Error loading company data.")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const addCategory = (name) => {
  return async (dispatch, getState, context) => {
    try {
      dispatch(setIsLoading(true))
      const id = name.replace(/\s+/g, '-').toLowerCase()
      let skillset = getState().skillset 
      skillset[id] = {
        name,
        skills: {}
      }
      await Companies.updateSkillset(getState().company.id, skillset)
      dispatch(setSkillset({...skillset}))
    } catch(e) {
      alert("Error saving category data.")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const removeCategory = (id) => {
  return async (dispatch, getState, context) => {
    try {
      dispatch(setIsLoading(true))
      let skillset = getState().skillset 
      delete skillset[id]
      await Companies.updateSkillset(getState().company.id, skillset)
      dispatch(setSkillset({...skillset}))
    } catch(e) {
      alert("Error removing category data.")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const addSkill = (categoryId, name) => {
  return async (dispatch, getState, context) => {
    try {
      dispatch(setIsLoading(true))
      const id = name.replace(/\s+/g, '-').toLowerCase()
      let skillset = getState().skillset 
      skillset[categoryId].skills[id] = name
      await Companies.updateSkillset(getState().company.id, skillset)
      console.log(skillset)
      dispatch(setSkillset({...skillset}))
    } catch(e) {
      console.log(e)
      alert("Error saving data.")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const removeSkill = (categoryId, id) => {
  return async (dispatch, getState, context) => {
    try {
      dispatch(setIsLoading(true))
      let skillset = getState().skillset 
      delete skillset[categoryId].skills[id]
      await Companies.updateSkillset(getState().company.id, skillset)
      dispatch(setSkillset({...skillset}))
    } catch(e) {
      alert("Error removing data.")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}