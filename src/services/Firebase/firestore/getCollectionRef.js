import firestore from '~/services/Firebase/firestore'

/**
 * @info getCollectionRef (24 Mar 2021) // CREATION DATE
 *
 * @comment getCollectionRef - function for get collection reference.
 *
 * @since 24 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @param {string}     path      Path to collection
 *
 * @return {CollectionReference} object of document's data
 */

const getCollectionRef = (path) => firestore.collection(path)

export default getCollectionRef
