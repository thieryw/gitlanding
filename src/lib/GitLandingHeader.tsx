/* eslint-disable @typescript-eslint/ban-types */
import { TopBar } from "./TopBar";
import { createUseClassNames } from "./theme/useClassesNames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import type { Props as TopBarProps } from "./TopBar";
import ReactMarkdown from "react-markdown";
import { Image } from "./theme/design-system/Image";
import type { Props as ImageProps } from "./theme/design-system/Image";
import { cx } from "tss-react";
import { memo } from "react";

export type GitLandingHeaderProps = {
    title: string;
    subTitle: string;
    className?: string;
    image?: ImageProps;
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

const { useClassNames } = createUseClassNames<{
    background: GitLandingHeaderProps["background"];
}>()((theme, { background }) => ({
    "root": {
        "position": "relative",
        "width": "100vw",

        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "& >img": {},
        "textAlign": "center",
        "& h4": {
            "marginBottom": 30,
            "marginTop": 30,
        },
        "& h4, h5": {
            "maxWidth": "90%",
        },
        "color": (() => {
            switch (theme.palette.type) {
                case "dark":
                    return "white";
                case "light":
                    return "black";
            }
        })(),
    },
    "image": {
        "width": 600,
        "marginBottom": 50,
        "@media (max-width: 650px)": {
            "width": "90%",
        },
        "borderRadius": "5px",
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
}));

export const GitLandingHeader = memo((props: GitLandingHeaderProps) => {
    const { image, title, subTitle, buttons, background, topBarProps, paragraphMd, className } = props;

    const { classNames } = useClassNames({ background });

    return (
        <header className={cx(classNames.root, className)}>
            <div className={classNames.backgroundDiv}></div>
            {topBarProps !== undefined && <TopBar {...topBarProps} />}

            <Typography variant="h4">{title}</Typography>

            <Typography variant="h5">{subTitle}</Typography>

            {buttons !== undefined && (
                <div className={classNames.buttonWrapper}>
                    {buttons.map(button => (
                        <Button
                            variant="outlined"
                            href={button.url}
                            className={classNames.button}
                            key={button.name}
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

            {image !== undefined && (
                <Image
                    className={cx(classNames.image, image.className)}
                    url={image.url}
                    alt={image.alt}
                    hasFrame={image.hasFrame}
                    customFrameColor={image.customFrameColor}
                    hasFrameButtons={image.hasFrameButtons}
                />
            )}
        </header>
    );
});
