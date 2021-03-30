import { useState, useEffect } from 'react'
import { getCollectionRef } from '~/services/Firebase/firestore'

const useCollectionArray = (collectionPath, arrayIds = []) => {
  const [loading, setLoading] = useState(arrayIds.length ? true : false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const buf = []
      for (const id of arrayIds) {
        try {
          const docData = await getCollectionRef(collectionPath).doc(id).get()
          buf.push(docData.data())
          setData(buf)
        } catch (error) {
          console.log(error)
        }
      }
      setLoading(false)
    }

    arrayIds.length && fetchData()
  }, [])

  return [data, loading]
}

export default useCollectionArray
