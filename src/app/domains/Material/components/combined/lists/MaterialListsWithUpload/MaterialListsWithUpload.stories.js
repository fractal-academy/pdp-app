import React from 'react'
import MaterialListsWithUpload from './MaterialListsWithUpload.template'

const metadata = {
  title:
    'app/domains/Material/components/combined/lists/MaterialListsWithUpload',
  component: MaterialListsWithUpload
}
export default metadata

export const MaterialListsWithUploadStory = (args) => (
  <MaterialListsWithUpload {...args} />
)

MaterialListsWithUploadStory.args = {}
