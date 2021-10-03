import { ReactSVG } from "react-svg";
import { memo } from "react";
import { makeStyles } from "../theme";

type GlLogoProps = {
    logoUrl: string;
    className?: string;
    fill?: string;
    width?: number;
    height?: number;
};

const useStyles = makeStyles<{
    fill: string | undefined;
    width: number | undefined;
    height: number | undefined;
}>()((theme, { fill, height, width }) => ({
    "root": {
        width,
        height,
    },
    "svg": {
        "& svg": {
            "fill": fill ?? theme.colors.useCases.typography.textPrimary,
            "width": "100%",
            "height": "100%",
        },
    },
}));

export const GlLogo = memo((props: GlLogoProps) => {
    const { className, logoUrl, fill, height, width } = props;

    const { classes, cx } = useStyles({ fill, width, height });

    return logoUrl.endsWith(".svg") ? (
        <ReactSVG
            src={logoUrl}
            className={cx(classes.root, classes.svg, className)}
        />
    ) : (
        <img src={logoUrl} className={cx(classes.root, className)} alt="logo" />
    );
});
