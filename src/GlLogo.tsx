import { ReactSVG } from "react-svg";
import { memo } from "react";

type GlLogoProps = {
    logoUrl: string;
    className?: string;
};

export const GlLogo = memo((props: GlLogoProps) => {
    const { className, logoUrl } = props;

    return logoUrl.endsWith(".svg") ? (
        <ReactSVG src={logoUrl} className={className} />
    ) : (
        <img style={{}} src={logoUrl} className={className} alt="logo" />
    );
});
