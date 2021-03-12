import { useState } from 'react'
import _ from 'lodash'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import { Button, Divider, message } from 'antd'
import { Row, Col, Back, HeadingPrimary } from 'antd-styled'
import { MaterialSimpleForm } from 'domains/Material/components/forms'
import { MaterialSimpleUpload } from 'domains/Material/components/combined/uploads'
import storage from '~/services/Firebase/storage'

/**
 * @info MaterialCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment MaterialCreate - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const STORAGE_URL = 'materials/'

const MaterialCreate = () => {
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

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Row gutter={[8]} mb={3} justify="space-between">
          <Col>
            <Back size="large">Back</Back>
          </Col>
          <Col>
            <Button size="large" type="primary">
              Next
            </Button>
          </Col>
        </Row>
        <HeadingPrimary title="Add useful materials" />
        <Row gutter={[8, 16]} justify="center">
          <Col sm={24} md={20} lg={16} xl={14} xxl={10}>
            <MaterialSimpleForm onFinish={onLinkAdd} />
            <Divider>Or</Divider>
            <MaterialSimpleUpload
              materials={materials}
              onUpload={onMaterialUpload}
              onRemove={onMaterialRemove}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default MaterialCreate
