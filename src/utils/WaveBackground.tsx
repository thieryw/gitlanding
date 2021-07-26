import backgroundDarkUrl from "../assets/svg/backgroundWaveDark.svg";
import backgroundLightUrl from "../assets/svg/backgroundWaveLight.svg";
import { memo } from "react";
import { makeStyles } from "../theme";

const useStyles = makeStyles<{ offset: number }>()((theme, { offset }) => ({
    "root": {
        "background": `url("${
            theme.isDarkModeEnabled ? backgroundDarkUrl : backgroundLightUrl
        }")`,
        "backgroundSize": "100%",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "center",
        "overflow": "visible",
        "width": "100%",
        "height": 1250,
        "position": "absolute",
        "left": 0,
        "top": offset,
        "zIndex": -1,
    },
}));

type WaveBackgroundProps = {
    offset: number;
};

export const WaveBackground = memo((props: WaveBackgroundProps) => {
    const { offset } = props;

    const { classes } = useStyles({ offset });

    return <div className={classes.root} />;
});
