import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, Box, Text } from 'antd-styled'
import Icon, {
  FileImageOutlined,
  LinkOutlined,
  FileTextOutlined,
  FileZipOutlined,
  PaperClipOutlined
} from '@ant-design/icons'
import { Image, Space, Tag, Tooltip } from 'antd'
import _ from 'lodash'
import { saveAs } from 'file-saver'

/**
 * @info MaterialSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleView - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const FILE_TYPE_MAP = {
  image: FileImageOutlined,
  url: LinkOutlined,
  plain: FileTextOutlined,
  zip: FileZipOutlined
}

const SIZE_MAP = {
  lg: '36px',
  md: '24px',
  sm: '16px'
}

const MaterialSimpleView = (props) => {
  // [INTERFACES]
  const { type, size, name, url, tag } = props

  // [COMPUTED_PROPERTIES]
  const fixedType = _.takeWhile(type, (str) => str !== '/').join('')

  // [TEMPLATE]

  if (tag) {
    if (fixedType.includes('image')) {
      return <ImageMaterial {...props} type={fixedType} />
    } else if (fixedType.includes('url')) {
      return <LinkMaterial {...props} type={fixedType} />
    } else {
      return <FileMaterial {...props} />
    }
  }

  return (
    <Space>
      {fixedType.includes('image') ? (
        <Image
          width={SIZE_MAP[size]}
          height={SIZE_MAP[size]}
          style={{ borderRadius: '4px' }}
          src={url}
        />
      ) : (
        <Icon
          component={FILE_TYPE_MAP[type] ?? PaperClipOutlined}
          style={{ fontSize: SIZE_MAP[size] }}
        />
      )}
      {(type === 'url' && (
        <Link href={url} target="_blank">
          {name}
        </Link>
      )) || <Text>{name}</Text>}
    </Space>
  )
}

const LinkMaterial = (props) => {
  const { name, type, size, url } = props
  return (
    <>
      <Tag
        icon={
          <Tooltip title={name}>
            <Box display="flex" justifyContent="center" p={1} cursor="pointer">
              <Link href={url} target="_blank">
                <Icon
                  component={FILE_TYPE_MAP[type] ?? PaperClipOutlined}
                  style={{ fontSize: SIZE_MAP[size] }}
                />
              </Link>
            </Box>
          </Tooltip>
        }
        color="default"
      />
    </>
  )
}
const FileMaterial = (props) => {
  const { name, type, size, url } = props

  return (
    <>
      <Tag
        icon={
          <Tooltip title={name}>
            <Box
              display="flex"
              justifyContent="center"
              p={1}
              cursor="pointer"
              onClick={() => saveAs(url, name)}>
              <Icon
                component={FILE_TYPE_MAP[type] ?? PaperClipOutlined}
                style={{ fontSize: SIZE_MAP[size] }}
              />
            </Box>
          </Tooltip>
        }
        color="default"
      />
    </>
  )
}

const ImageMaterial = (props) => {
  const { name, type, size, url } = props
  const [previewVisible, setPreviewVisible] = useState(false)

  return (
    <>
      <Tag
        icon={
          <Tooltip title={name}>
            <Box
              display="flex"
              justifyContent="center"
              p={1}
              cursor="pointer"
              onClick={() => setPreviewVisible(true)}>
              <Icon
                component={FILE_TYPE_MAP[type] ?? PaperClipOutlined}
                style={{ fontSize: SIZE_MAP[size] }}
              />
            </Box>
          </Tooltip>
        }
        color="default"
      />
      <Image
        preview={{
          visible: previewVisible,
          src: url,
          mask: null,
          onVisibleChange: () => setPreviewVisible(false)
        }}
      />
    </>
  )
}

// [PROPTYPES]
MaterialSimpleView.propTypes = {
  type: PropTypes.oneOf(Object.keys(FILE_TYPE_MAP)),
  size: PropTypes.oneOf(Object.keys(SIZE_MAP)),
  name: PropTypes.string,
  url: PropTypes.string
}

MaterialSimpleView.defaultProps = {
  size: SIZE_MAP.md
}
export default MaterialSimpleView
