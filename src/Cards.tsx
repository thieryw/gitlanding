import {GlCards} from "gitlanding/GlCards/"
import {GlLogoCard} from "gitlanding/GlCards/GlLogoCard";
import {memo} from "react";
import tssLogoUrl from "./assets/img/tss-logo.png";
import onyxiaLogoUrl from "./assets/svg/OnyxiaLogo.svg";
import powerhooksLogoUrl from "./assets/svg/powerhooksLogo.svg";



export const Cards = memo(()=>{



	return (
		<GlCards
			title="This project is powered by: "
		>
			<GlLogoCard
				iconUrls={[tssLogoUrl]}
				title="TSS-REACT"
				paragraph="Like JSS but for TypeScript. Powered by emotion"
				link={{
					"href": "https://github.com/garronej/tss-react"
				}}

			/>

			<GlLogoCard
				iconUrls={[onyxiaLogoUrl]}
				title="ONYXIA-UI"
				paragraph="A modern UI toolkit with excellent typing.
					Highly customizable but looks great out of the box.
					Build on top of material-ui.
				"
				link={{
					"href": "https://github.com/garronej/onyxia-ui"
				}}
			/>

			<GlLogoCard 
				iconUrls={[powerhooksLogoUrl]}
				title="POWERHOOKS"
				paragraph="The hooks you wish where React builtin"
				link={{
					"href": "https://github.com/garronej/powerhooks"
				}}
			/>

		</GlCards>
	)

})