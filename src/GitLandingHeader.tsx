/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { TopBar } from "./components/TopBar";
import { Typography } from "onyxia-ui/Typography";
import type { Props as TopBarProps } from "./components/TopBar";
import { Image } from "./components/Image";
import type { ImageProps } from "./components/Image";
import { cx } from "tss-react";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { DownArrow } from "./components/DownArrow";
import Link from "@material-ui/core/Link";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";
declare namespace BackgroundProps {
    export type Color = {
        type: "color";
        backgroundColor: string;
    };

    export type ImageUrl = {
        type: "image";
        imageUrl: string;
    };
}

export type GitLandingHeaderProps = {
    titleMd?: string;
    subTitleMd?: string;
    className?: string;
    image?: ImageProps;
    /**
     * you can use markdown between back ticks.
     */
    background?: BackgroundProps.Color | BackgroundProps.ImageUrl;
    topBarProps?: TopBarProps;
    linkToMainSection?: {
        title: string;
    };
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        background: GitLandingHeaderProps["background"];
    }>()((theme, { background }) => ({
        "root": {
            "position": "relative",
            "width": "100%",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "& p": {
                "margin": 0,
            },
        },
        "presentation": {
            "display": "flex",
            "width": "100%",
            "boxSizing": "border-box",
            "justifyContent": "center",
            "marginTop": theme.spacing(5),
        },

        "presentationText": {
            "position": "relative",
            "left": 100,
            "textAlign": "left",
            "width": 994,
            "zIndex": 1,
            "& h2": {
                "fontSize": "86px",
                "marginBottom": theme.spacing(4),
                "width": 1000,
            },
            "& h3": {
                "width": 650,
                "fontWeight": 400,
                "lineHeight": "40px",
            },
            [theme.breakpoints.down(1440)]: {
                "width": 650,
                "left": 100,
                "& h2": {
                    "fontSize": "52px",
                    "width": "unset",
                },
                "& h3": {
                    "lineHeight": "20px",
                    "fontSize": "18px",
                    "width": 450,
                },
            },
        },
        "image": {
            "position": "relative",
            "right": 100,
            "width": 900,
            [theme.breakpoints.down(1440)]: {
                "width": 755,
                "right": theme.spacing(4.5),
            },
        },
        "backgroundDiv": {
            "background": (() => {
                if (background === undefined) {
                    return undefined;
                }

                if (background.type === "color") {
                    return theme.isDarkModeEnabled
                        ? background.backgroundColor
                        : background.backgroundColor;
                }

                return `
                    url("${theme.isDarkModeEnabled ? background.imageUrl : background.imageUrl}")
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
            "filter": theme.isDarkModeEnabled ? "brightness(0.8)" : undefined,
        },
        "button": {
            "color": theme.isDarkModeEnabled ? "white" : "black",
            "margin": 15,
        },
        "buttonWrapper": {
            "marginTop": 30,
            "marginBottom": 30,
            "maxWidth": 650,
        },
        "linkToMainSection": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "marginTop": theme.spacing(10),
            "& h3": {
                "fontWeight": 400,
                "marginBottom": 21,
            },
        },
    }));

    return { useClassNames };
};

export const GitLandingHeader = memo((props: GitLandingHeaderProps) => {
    const { image, titleMd, subTitleMd, background, topBarProps, className, linkToMainSection } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({ background });

    return (
        <header className={cx(classNames.root, className)}>
            <div className={classNames.backgroundDiv}></div>
            {topBarProps !== undefined && <TopBar {...topBarProps} />}
            <div className={classNames.presentation}>
                <div className={classNames.presentationText}>
                    {titleMd && (
                        <Typography variant="h2">
                            <ReactMarkdown>{titleMd}</ReactMarkdown>
                        </Typography>
                    )}
                    {subTitleMd && (
                        <Typography variant="h3">
                            <ReactMarkdown>{subTitleMd}</ReactMarkdown>
                        </Typography>
                    )}
                </div>

                {image !== undefined && (
                    <Image
                        className={cx(classNames.image, image.className)}
                        url={image.url}
                        alt={image.alt}
                    />
                )}
            </div>

            {linkToMainSection && (
                <div className={classNames.linkToMainSection}>
                    <Typography variant="h3">
                        <ReactMarkdown>{linkToMainSection.title}</ReactMarkdown>
                    </Typography>
                    <Link href="#main-section">
                        <DownArrow />
                    </Link>
                </div>
            )}
        </header>
    );
});
