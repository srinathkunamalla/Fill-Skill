import firebase from '../service/firebase'
import { COLLECTIONS } from './constants';
const db = firebase.firestore()
let companiesRef = db.collection(COLLECTIONS.COMPANIES)

export const Managers = {
  create: (cid, did, name, email ) => {
    const id = name.replace(/\s+/g, '-').toLowerCase()
    console.log(id)
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).collection(COLLECTIONS.MANAGERS).doc(id).set({
      id,
      name,
      email
    }).catch(e => {
      console.log(e)
    })
  },
  read: (cid, did, mid) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).collection(COLLECTIONS.MANAGERS).doc(mid).get()
    .then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          return doc.data()
        } else {
          return undefined
        }
    })
  },
  update: (cid, did, mid, name, email) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).collection(COLLECTIONS.MANAGERS).doc(mid).update({
      name,
      email
    })
  },
  delete: (cid, did, mid) => {
    return companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).collection(COLLECTIONS.MANAGERS).doc(mid).delete()
  },
  getAll: async (cid, did)  => {
    let snapshot = await companiesRef.doc(cid).collection(COLLECTIONS.DIRECTORS).doc(did).collection(COLLECTIONS.MANAGERS).get()
    return snapshot.docs.map(doc => Object.assign({id: 'test'}, doc.data()))
  }
}