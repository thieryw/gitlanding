import { ReactSVG } from "react-svg";
import { memo } from "react";

type Props = {
    logoUrl: string;
    className?: string;
};

export const Logo = memo((props: Props) => {
    const { className, logoUrl } = props;

    return logoUrl.endsWith(".svg") ? (
        <ReactSVG src={logoUrl} className={className} />
    ) : (
        <img src={logoUrl} className={className} alt="logo" />
    );
});
