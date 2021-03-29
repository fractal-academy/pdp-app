import firebase from '../init'
import 'firebase/firestore'

const firestore = firebase.firestore()

export default firestore

export { default as getTimestamp } from './getTimestamp'
export { default as getDocumentData } from './getDocumentData'
export { default as getCollectionData } from './getCollectionData'
export { default as deleteDocument } from './deteleDocument'
export { default as setDocument } from './setDocument'
export { default as updateDocument } from './updateDocument'
export { default as createDocument } from './createDocument'
export { default as getDocumentRef } from './getDocumentRef'
export { default as getCollectionRef } from './getCollectionRef'
