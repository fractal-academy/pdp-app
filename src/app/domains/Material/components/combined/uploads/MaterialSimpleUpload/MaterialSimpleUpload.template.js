import PropTypes from 'prop-types'
import { Upload } from 'antd'
import {
  FileImageOutlined,
  FileTextOutlined,
  FileZipOutlined,
  InboxOutlined,
  LinkOutlined,
  VideoCameraOutlined,
  FileOutlined,
  LoadingOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
const { Dragger } = Upload

/**
 * @info MaterialSimpleUpload (10 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleUpload - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const FILE_TYPE_MAP = {
  image: FileImageOutlined,
  url: LinkOutlined,
  plain: FileTextOutlined,
  zip: FileZipOutlined,
  video: VideoCameraOutlined
}

const MaterialSimpleUpload = (props) => {
  // [INTERFACES]
  const { materials, onUpload, onRemove } = props

  // [HELPER_FUNCTIONS]
  const customFileIcon = (file) => {
    if (file.status === 'uploading') {
      return <LoadingOutlined />
    }
    if (file.status === 'error') {
      return <CloseCircleOutlined style={{ color: 'red' }} />
    }
    const inter = Object.keys(FILE_TYPE_MAP).find((item) =>
      file.type.includes(item)
    )
    if (!FILE_TYPE_MAP[inter]) {
      return <FileOutlined />
    }
    const Icon = FILE_TYPE_MAP[inter]
    return <Icon />
  }

  // [TEMPLATE]
  return (
    <Dragger
      name="material"
      height="fit-content"
      listType="picture"
      iconRender={customFileIcon}
      fileList={materials}
      customRequest={onUpload}
      isImageUrl={(file) => file.type.includes('image')}
      onRemove={onRemove}
      multiple>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  )
}

// [PROPTYPES]
MaterialSimpleUpload.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object),
  onUpload: PropTypes.func,
  onRemove: PropTypes.func
}

export default MaterialSimpleUpload
