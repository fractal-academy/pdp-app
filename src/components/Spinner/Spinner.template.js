import { Spin } from 'antd'
import { Box } from 'antd-styled'
import { LoadingOutlined } from '@ant-design/icons'
/**
 * @info Spinner (05 Mar 2021) // CREATION DATE
 *
 * @comment Spinner - React component.
 *
 * @since 29 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const Spinner = () => {
  // [TEMPLATE]
  return (
    <Box display="flex" justifyContent="center" flex={1} alignItems="center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </Box>
  )
}

export default Spinner
