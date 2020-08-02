import firebase from '../service/firebase'
import { COLLECTIONS } from './constants';
const db = firebase.firestore()
let companiesRef = db.collection(COLLECTIONS.COMPANIES);

export const Companies = {
  create: (name, email) => {
    // todo check existence 
    const id = name.replace(/\s+/g, '-').toLowerCase()
    return companiesRef.doc(id).set({
      id,
      name,
      email
    })
  },
  read: (email) => {
    return companiesRef.where("email", "==", "admin@walmart.com").get()
    .then((snapshot) => {
      console.log(snapshot.docs.map(doc => Object.assign({id: doc.id}, doc.data()))[0])
      return snapshot.docs.map(doc => Object.assign({id: doc.id}, doc.data()))[0]
    })
  }
}