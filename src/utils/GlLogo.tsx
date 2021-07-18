import { ReactSVG } from "react-svg";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles<{
        fill: string | undefined;
    }>()((theme, { fill }) => ({
        "svg": {
            "fill": fill ?? theme.colors.useCases.typography.textPrimary,
        },
    }));

    return { useStyles };
};

type GlLogoProps = {
    logoUrl: string;
    className?: string;
    fill?: string;
};

export const GlLogo = memo((props: GlLogoProps) => {
    const { className, logoUrl, fill } = props;

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles({ fill });

    return logoUrl.endsWith(".svg") ? (
        <ReactSVG src={logoUrl} className={cx(classes.svg, className)} />
    ) : (
        <img src={logoUrl} className={className} alt="logo" />
    );
});
