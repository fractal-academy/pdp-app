import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import { Divider, message, Empty } from 'antd'
import { MaterialSimpleForm } from 'domains/Material/components/forms'
import { MaterialSimpleUpload } from 'domains/Material/components/combined/uploads'
import storage from '~/services/Firebase/storage'
import firestore from '~/services/Firebase/firestore'
import { PageWrapper } from '~/components/HOC'
import { COLLECTIONS, ROUTE_PATHS } from 'app/constants'

/**
 * @info MaterialCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment MaterialCreate - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
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

  // Check if there are already exist materials for currentLevels
  if (historyState?.materialTemplates) {
    currentLevelMaterials =
      historyState.materialTemplates?.[currentLevels.levelId]?.[
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
      const collectionRef = firestore.collection(COLLECTIONS.MATERIAL_TEMPLATES)

      const materialRef = await collectionRef.add({})

      const link = { url, name: url, type: 'url', id: materialRef.id }
      await collectionRef.doc(materialRef.id).set(link)

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
        const collectionRef = firestore.collection(
          COLLECTIONS.MATERIAL_TEMPLATES
        )

        const materialRef = await collectionRef.add({})

        const material = {
          id: materialRef.id,
          name: file.name,
          url: materialURL,
          type: file.type,
          size: file.size
        }

        await collectionRef.doc(materialRef.id).set(material)

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
        await firestore
          .collection(COLLECTIONS.MATERIAL_TEMPLATES)
          .doc(removedItem.id)
          .delete()

        setMaterials(buffer)
        message.success('Material was successfully deleted.')
      } catch (error) {
        message.error(error.message)
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

      if (historyState?.materialTemplates) {
        currentLevelMaterials = {
          ...historyState?.materialTemplates[levelId],
          [subLevelId]: materials
        }
      }

      return history.push(historyState.prevLocation, {
        ...historyState,
        materialTemplates: {
          ...historyState?.materialTemplates,
          [levelId]: currentLevelMaterials
        }
      })
    }
    // If there are no todos delete empty object from history state
    if (historyState?.materialTemplates) {
      delete historyState?.materialTemplates[levelId][subLevelId]
      // Check if there was last item is this level delete level object
      if (!Object.values(historyState?.materialTemplates[levelId]).length) {
        delete historyState?.materialTemplates[levelId]
      }
    }
    history.push(historyState.prevLocation, historyState)
  }

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Add useful materials"
      nextBtnProps={{ text: 'Save' }}
      onNext={onSave}
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
