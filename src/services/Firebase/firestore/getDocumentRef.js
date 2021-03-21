import firestore from '~/services/Firebase/firestore'

/**
 * @info getDocumentRef (19 Mar 2021) // CREATION DATE
 *
 * @comment getDocumentRef - function for get document reference.
 *
 * @since 19 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @param {string}     path      Path to collection
 *
 * @return {DocumentReference<DocumentData>} object of document's data
 */

const getDocumentRef = (path) => firestore.collection(path).doc()

export default getDocumentRef
