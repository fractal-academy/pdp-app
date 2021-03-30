import firestore from '~/services/Firebase/firestore'

/**
 * @info updateDocument (19 Mar 2021) // CREATION DATE
 *
 * @since 30 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @param {string}              path        Path to a collection.
 * @param {string}              id     	    Path to a document.
 * @param {object}              data        Data for the document.
 * @param {{merge:boolean}}     [options]     An object to configure the method behavior.
 *
 * @return {Promise<void>}
 */

const updateDocument = (path, id, data, options) => {
  if (options?.merge) {
    return firestore.collection(path).doc(id).set(data, options)
  }
  return firestore.collection(path).doc(id).update(data)
}

export default updateDocument
