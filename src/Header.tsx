import {GlHeader} from "gitlanding/GlHeader";
import type {GlHeaderProps} from "gitlanding/GlHeader";
import {memo, useMemo} from "react";
import logoPng from "./assets/svg/logo.png";
import {makeStyles} from "gitlanding/theme";

const useStyles = makeStyles()(
	theme => ({
		"logo": {
			"cursor": "pointer",
			"height": theme.spacing(6)
		}
	})
)

export const Header = memo(()=>{

	const menuItems: GlHeaderProps["links"] = useMemo(() => {

		return [

			{
				"label": "GITHUB",
				"link": { "href": "https://github.com/thieryw/gitlanding" },
			},
			{
				"label": "DOCUMENTATION",
				"link": { "href": "https://docs.gitlanding.dev/" },
			},
			{
				"label": "STORYBOOK",
				"link": {
					"href": "https://sb.gitlanding.dev"
				}
			}
		]



	}, [])

	const {classes} = useStyles()


	return (
		<GlHeader
			links={menuItems}
			title={<img src={logoPng} onClick={()=> window.location.href = "#"} className={classes.logo} alt="logo"/>}
			enableDarkModeSwitch={true}
			githubRepoUrl="https://github.com/thieryw/gitlanding"
			githubButtonSize="large"
			isCollapsible={true}
			

		/>
	)

})