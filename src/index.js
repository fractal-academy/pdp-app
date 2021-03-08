import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './app'
import SessionProvider from 'contexts/Session/components'
import RoleProvider from 'contexts/Role/components'
import theme from './config/theme/antdStyled'
import 'styles/index.less'

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </SessionProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
)
