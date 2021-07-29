import backgroundDarkUrl from "../assets/svg/backgroundWaveDark.svg";
import backgroundLightUrl from "../assets/svg/backgroundWaveLight.svg";
import { memo } from "react";
import { makeStyles } from "../theme";
import { useDomRect } from "powerhooks/useDomRect";

const useStyles = makeStyles<{ offset: number; width: number }>()(
    (theme, { offset, width }) => ({
        "root": {
            "background": `url("${
                theme.isDarkModeEnabled ? backgroundDarkUrl : backgroundLightUrl
            }")`,
            "backgroundSize": "100%",
            "backgroundRepeat": "no-repeat",
            "backgroundPosition": "center",
            "overflow": "visible",
            "height": 1250,
            "position": "absolute",
            "left": 0,
            "top": offset,
            "zIndex": -1,
        },
    }),
);

type WaveBackgroundProps = {
    offset: number;
};

export const WaveBackground = memo((props: WaveBackgroundProps) => {
    const { offset } = props;

    const {
        ref,
        domRect: { width },
    } = useDomRect();

    const { classes } = useStyles({ offset, width });

    return <div ref={ref} className={classes.root} />;
});
