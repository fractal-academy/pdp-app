import React from 'react'
import {ThemeProvider} from 'styled-components'
import antdStyled from '../src/config/theme/antdStyled'
export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },

	controls: { expanded: true }
}
export const decorators = [
 (Story) => (
	 <ThemeProvider theme = {antdStyled}>
		 <Story/>
	 </ThemeProvider>
 )
]
