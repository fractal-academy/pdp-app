import PropTypes from 'prop-types'
import { Box, Text, Link } from 'antd-styled'
import Icon, {
  FileImageOutlined,
  LinkOutlined,
  FileTextOutlined,
  FileZipOutlined,
  PaperClipOutlined
} from '@ant-design/icons'
import { Image, Space } from 'antd'

/**
 * @info MaterialSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleView - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
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
  const { type, size, name, url } = props
  // [TEMPLATE]
  return (
    <Space>
      {type === 'image' ? (
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
