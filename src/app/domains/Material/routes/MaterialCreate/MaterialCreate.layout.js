import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import { Divider, message, Empty } from 'antd'
import { PageWrapper } from '~/components/HOC'
import { MaterialSimpleForm } from 'domains/Material/components/forms'
import { MaterialSimpleUpload } from 'domains/Material/components/combined/uploads'
import storage from '~/services/Firebase/storage'
import {
  deleteDocument,
  getDocumentRef,
  setDocument
} from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info MaterialCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment MaterialCreate - React component.
 *
 * @since 30 Mar 2021 ( v.0.1.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const STORAGE_URL = 'materials/'

const MaterialCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state
  const currentLevels = historyState.selectedLevel
  let currentLevelMaterials

  // [TECHNOLOGY CREATION WIZARD]
  // Check if there are already exist materials for currentLevels
  if (historyState?.materialIds) {
    currentLevelMaterials =
      historyState.materialIds?.[currentLevels.levelId]?.[
        currentLevels.subLevelId
      ]
  }

  // [PLAN CREATION WIZARD]
  if (historyState.planId) {
    const currentTech = historyState.selectedTech.find(
      ({ key }) => key === historyState.technologyId
    )
    currentLevelMaterials =
      currentTech.materialIds?.[currentLevels.levelId]?.[
        currentLevels.subLevelId
      ]
  }

  // [COMPONENT_STATE_HOOKS]
  const [materials, setMaterials] = useState(currentLevelMaterials || [])
  const [linkLoading, setLinkLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onLinkAdd = async (data) => {
    const { url } = data
    setLinkLoading(true)

    try {
      let collectionPath = COLLECTIONS.MATERIALS
      if (historyState.planId) {
        collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}/${COLLECTIONS.MATERIALS}`
      }

      const materialId = getDocumentRef(COLLECTIONS.MATERIALS).id

      const link = {
        url,
        name: url,
        type: 'url',
        id: materialId,
        levelIds: currentLevels,
        readOnly: true
      }

      await setDocument(collectionPath, materialId, link)

      setMaterials([...materials, link])
    } catch (error) {
      console.log('link Add', error)
    }

    setLinkLoading(false)
  }

  const onMaterialUpload = (data) => {
    const { file } = data
    // Init uploading (add to list & set loading status)
    const material = {
      name: file.name,
      status: 'uploading',
      percent: 0
    }
    setMaterials([...materials, material])

    const MY_NAMESPACE = uuidv4()
    const storageRef = storage
      .ref()
      .child(STORAGE_URL + uuidv5(file.name, MY_NAMESPACE))

    const uploadTask = storageRef.put(file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calc of upload progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ).toFixed(2)

        // Update item while it uploading
        const material = {
          name: file.name,
          status: 'uploading',
          percent: progress
        }
        setMaterials([...materials, material])
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized': {
            message.error("You don't have permissions.")
            break
          }
          default: {
            message.error(error.code)
          }
        }

        const material = {
          name: file.name,
          status: 'error'
        }
        setMaterials([...materials, material])
      },
      async () => {
        // Set result material data to list
        const materialURL = await uploadTask.snapshot.ref.getDownloadURL()

        let collectionPath = COLLECTIONS.MATERIALS
        if (historyState.planId) {
          collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}/${COLLECTIONS.MATERIALS}`
        }

        const materialId = getDocumentRef(COLLECTIONS.MATERIALS).id

        const material = {
          id: materialId,
          name: file.name,
          url: materialURL,
          type: file.type,
          size: file.size,
          levelIds: currentLevels,
          readOnly: true
        }

        await setDocument(collectionPath, materialId, material)

        setMaterials([...materials, material])
      }
    )
  }

  const onMaterialRemove = async (material) => {
    const buffer = [...materials]
    const removedItem = _.remove(buffer, (item) => item.uid === material.uid)[0]

    if (removedItem.type !== 'url') {
      const storageRef = storage.refFromURL(removedItem.url)
      try {
        await storageRef.delete()
        let collectionPath = COLLECTIONS.MATERIALS
        if (historyState.planId) {
          collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}/${COLLECTIONS.MATERIALS}`
        }
        await deleteDocument(collectionPath, removedItem.id)

        setMaterials(buffer)
        message.success('Material was successfully deleted.')
      } catch (error) {
        message.error('material delete', error.message)
      }
    } else {
      setMaterials(buffer)
      message.success('Material was successfully deleted.')
    }
    return false
  }

  const onSave = () => {
    const { levelId, subLevelId } = historyState.selectedLevel
    if (materials.length) {
      let currentLevelMaterials = { [subLevelId]: materials }

      if (historyState?.materialIds) {
        currentLevelMaterials = {
          ...historyState?.materialIds[levelId],
          [subLevelId]: materials
        }
      }

      let data = {
        ...historyState,
        materialIds: {
          ...historyState?.materialIds,
          [levelId]: currentLevelMaterials
        }
      }
      if (historyState.selectedTech) {
        const techIndex = historyState.selectedTech.findIndex(
          ({ key }) => key === historyState.technologyId
        )
        historyState.selectedTech[techIndex].materialIds = {
          ...historyState?.materialIds,
          [levelId]: currentLevelMaterials
        }
        data = historyState
      }

      return history.replace(historyState.prevLocation, data)
    }
    // If there are no todos delete empty object from history state
    if (historyState?.materialIds) {
      delete historyState?.materialIds[levelId][subLevelId]
      // Check if there was last item is this level delete level object
      if (!Object.values(historyState?.materialIds[levelId]).length) {
        delete historyState?.materialIds[levelId]
      }
    }
    history.replace(historyState.prevLocation, historyState)
  }

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Add useful materials"
      backBtnProps={{ text: 'Save' }}
      onBack={onSave}>
      <MaterialSimpleForm onFinish={onLinkAdd} loading={linkLoading} />
      <Divider>Or</Divider>
      <MaterialSimpleUpload
        materials={materials}
        onUpload={onMaterialUpload}
        onRemove={onMaterialRemove}
      />

      {!materials.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No materials"
        />
      )}
    </PageWrapper>
  )
}

export default MaterialCreate
