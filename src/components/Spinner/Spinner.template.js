import { Spin } from 'antd'
import { Box } from 'antd-styled'
import { LoadingOutlined } from '@ant-design/icons'
/**
 * @info Spinner (05 Mar 2021) // CREATION DATE
 *
 * @comment Spinner - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const Spinner = () => {
  // [TEMPLATE]
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100%"
      alignItems="center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </Box>
  )
}

export default Spinner
