import { ReactSVG } from "react-svg";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { cx } from "tss-react";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        fill: string | undefined;
    }>()((theme, { fill }) => ({
        "svg": {
            "fill": fill ?? theme.colors.useCases.typography.textPrimary,
        },
    }));

    return { useClassNames };
};

type GlLogoProps = {
    logoUrl: string;
    className?: string;
    fill?: string;
};

export const GlLogo = memo((props: GlLogoProps) => {
    const { className, logoUrl, fill } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({ fill });

    return logoUrl.endsWith(".svg") ? (
        <ReactSVG src={logoUrl} className={cx(classNames.svg, className)} />
    ) : (
        <img src={logoUrl} className={className} alt="logo" />
    );
});
