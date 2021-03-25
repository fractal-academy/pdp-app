import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import _ from 'lodash'

const mergeUserData = async (role, data) => {
  const usersSnapshot = await firestore
    .collection(COLLECTIONS.USERS)
    .where('role', '==', role)
    .get()

  const usersData = usersSnapshot.docs.map((snapshot) => snapshot.data())

  return Object.values(
    _.merge(_.keyBy(usersData, 'id'), _.keyBy(data, 'userId'))
  )
}

export default mergeUserData
