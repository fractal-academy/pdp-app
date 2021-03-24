/**
 * @param {firebase.storage.Reference} reference - The reference to the given path.
 * @returns {Promise<string|any>}
 */
const getURL = async (reference) => {
  return reference.getDownloadURL()
}

export default getURL
