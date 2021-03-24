import storage from '~/services/Firebase/storage'
/**
 * @param {firebase.storage.Reference|string} reference - The reference to the given path.
 * @param {boolean} url - set true if wanna delete file using url not reference.
 * @returns {Promise<any>} - A Promise that resolves if the deletion succeeded and rejects if it failed, including if the object didn't exist.
 */
const deleteURL = async (reference, url = false) => {
  if (url) {
    return storage.refFromURL(reference).delete()
  }
  return reference.delete()
}

export default deleteURL
