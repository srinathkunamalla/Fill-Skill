import firebase from '../service/firebase'
import { COLLECTIONS } from './constants';
const db = firebase.firestore()
let companiesRef = db.collection(COLLECTIONS.COMPANIES)

export const Directors = {
  create: (cid, name, org) => {
    const id = name.replace(/\s+/g, '-').toLowerCase()
    console.log(id)
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(id).set({
      id,
      name,
      org
    }).catch(e => {
      console.log(e)
    })
  },
  read: (cid, did) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).get()
    .then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          return doc.data()
        } else {
          return undefined
        }
    })
  },
  update: (cid, did, name, org) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).update({
      name,
      org
    })
  },
  delete: (cid, did) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).delete()
  },

}