import firebase from 'firebase'
import 'firebase/firestore'

const firestore = firebase.firestore()

export default firestore

export { default as getTimestamp } from './getTimestamp'
