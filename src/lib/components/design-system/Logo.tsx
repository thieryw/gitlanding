import { ReactSVG } from "react-svg";

type Props = {
    logoUrl: string;
    classNameSvg?: string;
    classNameImg?: string;
};

export const Logo = (props: Props) => {
    const { classNameSvg, logoUrl, classNameImg } = props;

    return logoUrl.endsWith(".svg") ? (
        <ReactSVG src={logoUrl} className={classNameSvg} />
    ) : (
        <img src={logoUrl} className={classNameImg} alt="logo" />
    );
};
