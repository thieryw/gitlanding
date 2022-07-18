import { customViewPorts } from "./customViewPorts";
import { darkTheme, lightTheme } from "./customTheme";
import { DocsContainer } from "./DocsContainer"



export const parameters = {
  "actions": { argTypesRegex: "^on[A-Z].*" },
  "controls": {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  "darkMode": {
    "light": lightTheme,
    "dark": darkTheme
  },
  "docs": {
    "container": DocsContainer
  },
  "viewport": {
    "viewports": customViewPorts
  },
  "defaultViewport": "someDefault"
}
