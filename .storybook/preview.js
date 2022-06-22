import { customViewPorts } from "./customViewPorts";
import {darkTheme, lightTheme} from "./customTheme";



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
  "viewport": {
    "viewports": customViewPorts
  },
  "defaultViewport": "someDefault"
}
