import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import { Divider, message, Empty } from 'antd'
import { MaterialSimpleForm } from 'domains/Material/components/forms'
import { MaterialSimpleUpload } from 'domains/Material/components/combined/uploads'
import storage from '~/services/Firebase/storage'
import { PageWrapper } from '~/components/HOC'
import { ROUTE_PATHS } from 'app/constants'

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
  // [COMPONENT_STATE_HOOKS]
  const [materials, setMaterials] = useState([])

  // [HELPER_FUNCTIONS]
  const onLinkAdd = (data) => {
    const { url } = data
    const link = { url, name: url, type: 'url' }
    setMaterials([...materials, link])
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
      () => {
        // Set result material data to list
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const material = {
            name: file.name,
            url: downloadURL,
            type: file.type,
            size: file.size
          }
          setMaterials([...materials, material])
        })
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

  const onBack = () =>
    history.replace(history.location.state.prevLocation, history.location.state)
  const onNext = () =>
    history.push(ROUTE_PATHS.INTERVIEW_CREATE, { ...history.state, materials })

  // [TEMPLATE]
  return (
    <PageWrapper title="Add useful materials" onBack={onBack} onNext={onNext}>
      <MaterialSimpleForm onFinish={onLinkAdd} />
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
