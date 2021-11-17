import { createThemeProvider, defaultGetTypographyDesc } from "onyxia-ui";


export const { ThemeProvider } = createThemeProvider({
	"getTypographyDesc": params => ({
			...defaultGetTypographyDesc(params),
			"fontFamily": '"Open Sans", sans-serif'
		})
})