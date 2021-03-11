import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import { Typography, Form, Cascader } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import {
  LevelAdvancedView,
  LevelSimpleView
} from 'domains/Level/components/views'
import { TechnologySimpleView } from 'domains/Technology/components/views'
const { Text } = Typography

/**
 * @info LevelTreeSingleSelect (09 Mar 2021) // CREATION DATE
 *
 * @comment LevelTreeSingleSelect - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const LevelTreeSingleSelect = (props) => {
  // [INTERFACES]
  const { ...rest } = props

  // [ADDITIONAL_HOOKS]
  const [technologies, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES)
  )

  const options = []
  const getOptions = () => {
    const getSublevels = (sublevels) =>
      sublevels.map((sublevel) => ({
        value: sublevel,
        label: <LevelSimpleView sublevelId={sublevel} />
      }))

    const getLevels = (levels) =>
      Object.keys(levels).map((level) => ({
        value: level,
        label: <LevelSimpleView levelId={level} />,
        children: getSublevels(levels[level])
      }))

    Object.keys(technologies).forEach((technology) => {
      const children = getLevels(technologies[technology].levelIds)
      options.push({
        value: technologies[technology].id,
        label: (
          <TechnologySimpleView
            withHashTag
            technologyId={technologies[technology].id}
          />
        ),
        children: children
      })
    })
    return options
  }
  const renderCascaderItem = (data) => {
    return (
      <Box display="flex" justifyContent="space-between" mr={2}>
        <TechnologySimpleView
          withHashTag
          technologyId={data[0]?.props?.technologyId}
        />
        <LevelAdvancedView
          levelId={data[1]?.props?.levelId}
          subLevelId={data[2]?.props?.sublevelId}
        />
      </Box>
    )
  }
  !loading && getOptions()

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <Form.Item {...rest}>
      <Cascader
        displayRender={(data) => data.length > 0 && renderCascaderItem(data)}
        options={options}
        placeholder="Please select"
      />
    </Form.Item>
  )
}

// [PROPTYPES]
LevelTreeSingleSelect.propTypes = {}

export default LevelTreeSingleSelect
