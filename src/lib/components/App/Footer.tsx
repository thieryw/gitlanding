/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/ban-types */
import Link from "@material-ui/core/Link";
import { createUseClassNames } from "../../theme/useClassesNames";
import Typography from "@material-ui/core/Typography";

type Item = {
    name: string;
    url: string;
    /**
     * The svg must not have fill color or the dark mode won't distinguish
     * Import your svg like that: import { ReactComponent as RedditSvg } from "assets/svg/reddit.svg";
     * and pass RedditSvg as logoSvgComponent.
     * */
    logoSvgComponent?: (props: {}) => ReturnType<React.FC>;
};

export type Props = {
    leftItems: Item[];
    rightItems: Item[];
    licence: string;
    background?: {
        type: "image" | "color";
        colorOrUrlDark: string;
        colorOrUrlLight: string;
    };
};

const { useClassNames } = createUseClassNames<{ background?: Props["background"] }>()(
    (theme, { background }) => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "color": theme.palette.type === "dark" ? theme.custom.color.palette.silverGray : "black",
            "& a": {
                "color": theme.palette.type === "dark" ? theme.custom.color.palette.silverGray : "black",
            },
            "background": (() => {
                if (background === undefined) {
                    return theme.custom.color.useCases.surface;
                }

                if (background.type === "color") {
                    return theme.palette.type === "dark"
                        ? background.colorOrUrlDark
                        : background.colorOrUrlLight;
                }

                return `center no-repeat url(${
                    theme.palette.type === "dark"
                        ? background.colorOrUrlDark
                        : background.colorOrUrlLight
                })`;
            })(),
            "backgroundSize": (() => {
                if (background === undefined || background.type === "color") {
                    return "unset";
                }

                return "cover";
            })(),
            "marginTop": 80,
        },
        "column": {
            "margin": 40,
            "& svg": {
                "fill": theme.palette.type === "dark" ? theme.custom.color.palette.silverGray : "black",
                "marginRight": 20,
                "height": 40,
                "width": 40,
            },
            "& a": {
                "display": "flex",
                "alignItems": "center",
                "height": 60,
            },
            "@media (max-width: 440px)": {
                "margin": "40px 10px 40px 10px",
            },
        },
        "licence": {
            "fontStyle": "italic",
        },
        "wrapper": {
            "display": "flex",
        },
    }),
);

export const Footer = (props: Props) => {
    const { licence, leftItems, rightItems, background } = props;

    const { classNames } = useClassNames({ background });

    return (
        <footer className={classNames.root}>
            <div className={classNames.wrapper}>
                {([leftItems, rightItems] as const).map((items, i) => (
                    <div className={classNames.column} key={i}>
                        {items.map(({ url, name, logoSvgComponent: LogoSvg }) => (
                            <Link href={url} key={url + name}>
                                {LogoSvg && <LogoSvg />}
                                <Typography>{name}</Typography>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            <p className={classNames.licence}>{licence}</p>
        </footer>
    );
};
