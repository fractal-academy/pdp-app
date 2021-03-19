import firestore from '~/services/Firebase/firestore'

/**
 * @info getCollectionData (19 Mar 2021) // CREATION DATE
 *
 * @comment getCollectionData - function for get data from collection
 *
 * @since 19 Mar 2021 ( v.0.0.2) // LAST-EDIT DATE
 *
 * @param {string}          props.path                Path to collection
 *
 * @return {Object[]} array of document's data
 */

const getCollectionData = async (path) => {
  const data = await firestore.collection(path).get()
  return data.docs.map((item) => item.data())
}
export default getCollectionData
