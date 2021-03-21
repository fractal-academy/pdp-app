import firebase from 'firebase'

/**
 * @returns {firebase.firestore.Timestamp}
 */

const getTimestamp = () => firebase.firestore.Timestamp

export default getTimestamp
