import firebase from '../service/firebase'
import { COLLECTIONS } from './constants';
import { v4 as uuidv4 } from 'uuid';
const db = firebase.firestore()
let companiesRef = db.collection(COLLECTIONS.COMPANIES)

export const Developers = {
  set: (cid, did, mid, dev) => {
    dev.id = dev.id || uuidv4()
    return companiesRef.doc(cid).collection(COLLECTIONS.DEVELOPERS).doc(dev.id).set({
      did,
      mid,
      ...dev
    }).catch(e => {
      console.log(e)
    })
  },
  read: (cid, did, mid, developerId) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DEVELOPERS).doc(developerId).get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          return doc.data()
        } else {
          return undefined
        }
      })
  },
  delete: (cid, did, mid, dev) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DEVELOPERS).doc(dev.id).delete()
  },
  getAll: async (cid, did, mid) => {
    let snapshot = await companiesRef.doc(cid).collection(COLLECTIONS.DEVELOPERS).get()
    const devs = snapshot.docs.map(doc => Object.assign({ id: 'test' }, doc.data()))
    let result = []
    devs.forEach(dev => {
      if (dev.did === did && dev.mid === mid) {
        result.push(dev)
      }
    })
    return result
  },
  search: async (cid, query) => {
    let snapshot = await companiesRef.doc(cid).collection(COLLECTIONS.DEVELOPERS).get()
    const devs = snapshot.docs.map(doc => Object.assign({ id: 'test' }, doc.data()))
    //query = "Javascript> 3"
    query = query.replace(/\s/g, '')
    let tokens = []

    // greater and equal
    tokens = query.split('>=')
    if (tokens.length > 1) {
      let skill = (tokens[0]).replace(/\s+/g, '-').toLowerCase()
      let rating = tokens[1]
      console.log(tokens)
      return devs.filter(dev => {
        return Number(dev[skill]) >= Number(rating)
      })
    }
    // less and equal
    tokens = query.split('<=')
    if (tokens.length > 1) {
      let skill = (tokens[0]).replace(/\s+/g, '-').toLowerCase()
      let rating = tokens[1]
      console.log(tokens)
      return devs.filter(dev => {
        return Number(dev[skill]) <= Number(rating)
      })
    }

    // greater
    tokens = query.split('>')
    if (tokens.length > 1) {
      let skill = (tokens[0]).replace(/\s+/g, '-').toLowerCase()
      let rating = tokens[1]
      console.log(tokens)
      return devs.filter(dev => {
        return Number(dev[skill]) > Number(rating)
      })
    }
    // less
    tokens = query.split('<')
    if (tokens.length > 1) {
      let skill = (tokens[0]).replace(/\s+/g, '-').toLowerCase()
      let rating = tokens[1]
      console.log(tokens)
      return devs.filter(dev => {
        return Number(dev[skill]) < Number(rating)
      })
    }
    // equal
    tokens = query.split('=')
    if (tokens.length > 1) {
      let skill = (tokens[0]).replace(/\s+/g, '-').toLowerCase()
      let rating = tokens[1]
      console.log(tokens)
      return devs.filter(dev => {
        return Number(dev[skill]) === Number(rating)
      })
    }


    return devs
  }
}