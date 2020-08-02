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
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        const doc = querySnapshot[0]
        return {
          id: doc.id,
          data: doc.data()
        }
    })
  }
}