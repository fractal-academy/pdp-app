import firestore from '~/services/Firebase/firestore'

/**
 * @info deleteDocument (19 Mar 2021) // CREATION DATE
 *
 * @since 19 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @param {string}     path     Path to a collection.
 * @param {object}     data     An Object containing the data for the new document.
 *
 * @return {Promise<DocumentReference<DocumentData>>}
 */

const createDocument = (path, data = {}) => {
  return firestore.collection(path).add(data)
}

export default createDocument
