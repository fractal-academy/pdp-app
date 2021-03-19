import firestore from '~/services/Firebase/firestore'

/**
 * @info getDocumentData (19 Mar 2021) // CREATION DATE
 *
 * @comment getDocumentData - function for get data from document
 *
 * @since 19 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @param {string}          props.path                Path to document
 *
 * @return {object} object of document's data
 */

const getDocumentData = async (path, id) => {
  const data = await firestore.collection(path).doc(id).get()
  return data.data()
}
export default getDocumentData
