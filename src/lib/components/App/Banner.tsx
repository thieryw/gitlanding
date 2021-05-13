/* eslint-disable @typescript-eslint/ban-types */
import { TopBar } from "./TopBar";
import { createUseClassNames } from "../../theme/useClassesNames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import type { Props as TopBarProps } from "./TopBar";
import ReactMarkdown from "react-markdown";

export type Props = {
    title: string;
    subTitle: string;
    imageUrl?: string;

    /**
     * you can use markdown between back ticks.
     */
    paragraphMd?: string;
    background?: {
        type: "color" | "image";
        colorOrUrlDark: string;
        colorOrUrlLight: string;
    };
    buttons?: {
        name: string;
        url: string;
    }[];
    topBarProps?: TopBarProps;
};

const { useClassNames } = createUseClassNames<{ background: Props["background"] }>()(
    (theme, { background }) => ({
        "root": {
            "position": "relative",
            "width": "100vw",

            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "& >img": {
                "width": 600,
                "marginBottom": 50,
                "@media (max-width: 650px)": {
                    "width": "90%",
                },
                "borderRadius": "5px",
            },
            "textAlign": "center",
            "& h3": {
                "marginTop": 50,
            },
            "color": theme.palette.type === "dark" ? "white" : "black",
        },
        "backgroundDiv": {
            "background": (() => {
                if (background === undefined) {
                    return theme.palette.type === "dark"
                        ? "#05052b"
                        : theme.custom.color.palette.typeScriptBlue;
                }

                if (background.type === "color") {
                    return theme.palette.type === "dark"
                        ? background.colorOrUrlDark
                        : background.colorOrUrlLight;
                }

                return `
                    url("${
                        theme.palette.type === "dark"
                            ? background.colorOrUrlDark
                            : background.colorOrUrlLight
                    }")
                `;
            })(),
            "backgroundRepeat": "no-repeat",
            "backgroundSize": "cover",
            "backgroundPosition": "center",
            "width": "100%",
            "height": "100%",
            "position": "absolute",
            "top": 0,
            "left": 0,
            "zIndex": -1,
            "filter": theme.palette.type === "dark" ? "brightness(0.8)" : undefined,
        },
        "button": {
            "color": theme.palette.type === "dark" ? "white" : "black",
            "margin": 15,
        },
        "buttonWrapper": {
            "marginTop": 30,
            "marginBottom": 30,
            "maxWidth": 650,
        },
        "paragraph": {
            "width": 600,
            "marginBottom": 50,
            "@media (max-width: 650px)": {
                "width": "90%",
            },
        },
    }),
);

export const Banner = (props: Props) => {
    const {
        imageUrl: headerImageUrl,
        title,
        subTitle,
        buttons,
        background,
        topBarProps,
        paragraphMd,
    } = props;

    const { classNames } = useClassNames({ background });

    return (
        <header className={classNames.root}>
            <div className={classNames.backgroundDiv}></div>
            {topBarProps !== undefined && <TopBar {...topBarProps} />}

            <Typography variant="h4">{title}</Typography>

            <Typography variant="h5">{subTitle}</Typography>

            {buttons === undefined ? (
                ""
            ) : (
                <div className={classNames.buttonWrapper}>
                    {buttons.map((button, index) => (
                        <Button
                            variant="outlined"
                            href={button.url}
                            className={classNames.button}
                            key={JSON.stringify(button.name + index)}
                        >
                            {button.name}
                        </Button>
                    ))}
                </div>
            )}
            {paragraphMd !== undefined && (
                <div className={classNames.paragraph}>
                    <ReactMarkdown>{paragraphMd}</ReactMarkdown>
                </div>
            )}

            {headerImageUrl !== undefined && <img src={headerImageUrl} alt="" />}

            
        </header>
    );
};
