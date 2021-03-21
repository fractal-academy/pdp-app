import firestore from '~/services/Firebase/firestore'

/**
 * @info updateDocument (19 Mar 2021) // CREATION DATE
 *
 * @since 19 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @param {string}     path     Path to a collection.
 * @param {string}     id     	Path to a document.
 * @param {object}     data     Data for the document.
 *
 * @return {Promise<void>}
 */

const updateDocument = (path, id, data) => {
  return firestore.collection(path).doc(id).update(data)
}

export default updateDocument
