import storage from '~/services/Firebase/storage'
/**
 * @param {string} path - File path.
 * @returns {firebase.storage.Reference} - The reference to the given path.
 */
const storageReference = (path) => {
  return storage.ref().child(path)
}

export default storageReference
