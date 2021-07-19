import { ReactSVG } from "react-svg";
import { memo } from "react";
import { makeStyles } from "../theme";

const useStyles = makeStyles<{
    fill: string | undefined;
}>()((theme, { fill }) => ({
    "svg": {
        "fill": fill ?? theme.colors.useCases.typography.textPrimary,
    },
}));

type GlLogoProps = {
    logoUrl: string;
    className?: string;
    fill?: string;
};

export const GlLogo = memo((props: GlLogoProps) => {
    const { className, logoUrl, fill } = props;

    const { classes, cx } = useStyles({ fill });

    return logoUrl.endsWith(".svg") ? (
        <ReactSVG src={logoUrl} className={cx(classes.svg, className)} />
    ) : (
        <img src={logoUrl} className={className} alt="logo" />
    );
});
