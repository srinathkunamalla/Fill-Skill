import { ACTION_TYPES } from "./constants"
import { Companies } from "../../api/companies"
import { Directors } from "../../api/directors"
import { Type } from 'react-bootstrap-table2-editor';
import { textFilter } from 'react-bootstrap-table2-filter';

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

export const setColumns = (columns) => {
  return {
    type: ACTION_TYPES.SET_COLUMNS,
    columns
  }
}

const editor = {
  type: Type.SELECT,
  options: [{
    value: '5',
    label: '5'
  }, {
    value: '4',
    label: '4'
  }, {
    value: '3',
    label: '3'
  }, {
    value: '2',
    label: '2'
  }, {
    value: '1',
    label: '1'
  }, {
    value: '0',
    label: '0'
  }, {
    value: '',
    label: ''
  }]
}

const orderByKey = (unordered) => {
  const ordered = {};
  Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key];
  });
  return ordered
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
      let columns = [
        {
          dataField: 'name',
          text: 'Name',
          sort: true,
          filter: textFilter(),
        }
      ]
      const skillset = orderByKey(company.skillset)
      Object.keys(skillset).forEach(cat => {
        const skills = orderByKey(company.skillset[cat].skills)
        company.skillset[cat].skills = skills
        Object.keys(skills).forEach(key => {
          columns.push({
            dataField: key,
            text: skills[key],
            sort: true,
            editor,
            filter: textFilter(),
            align: 'center'
          })
        })
      })
      dispatch(setSkillset(skillset))
      dispatch(setColumns(columns))
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
      dispatch(getCompany())
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
      dispatch(getCompany())
    } catch(e) {
      alert("Error removing data.")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}