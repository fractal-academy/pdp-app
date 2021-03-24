import { storageReference, getURL } from '~/services/Firebase/storage'

/**
 * @param {Blob | Uint8Array | ArrayBuffer} file - selected files
 * @param {string} [path] - upload path
 * @returns {Promise<firebase.storage.Reference>}
 */
async function upload(file, path) {
  const ref = storageReference(path ? `${path}${file.name}` : file.name)
  const res = await ref.put(file)
  if (path) {
    return getURL(ref)
  }
  return res
}
export default upload
