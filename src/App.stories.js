import App from './App'

const metadata = {
  title: 'src/App',
  component: App
}
export default metadata

const Template = (args) => <App {...args} />

export const AppStory = Template.bind({})

AppStory.args = {
  title: 'Name wallet'
}
