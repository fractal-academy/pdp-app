import React from 'react'
import MaterialSimpleUpload from './MaterialSimpleUpload.template'

const metadata = {
  title:
    'app/domains/Material/components/combined/uploads/MaterialSimpleUpload',
  component: MaterialSimpleUpload
}
export default metadata

export const MaterialSimpleUploadStory = (args) => (
  <MaterialSimpleUpload {...args} />
)

MaterialSimpleUploadStory.args = {}
