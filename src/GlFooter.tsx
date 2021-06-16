/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/ban-types */
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { GlLogo } from "./GlLogo";
import { cx } from "tss-react";
import { memo } from "react";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlFooter = {
    leftItems: GlFooter.Item[];
    rightItems: GlFooter.Item[];
    licence: string;
    background?: {
        type: "image" | "color";
        colorOrUrlDark: string;
        colorOrUrlLight: string;
    };
    className?: string;
};

export declare namespace GlFooter {
    type Item = {
        name: string;
        url: string;
        /**
         * If you use an svg image that does not have a fill,
         * the fill will be set to the current font color,
         * depending on the dark mode being active.
         */
        logoUrl?: string;
    };
}

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        background?: GlFooter["background"];
    }>()((theme, { background }) => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "background": (() => {
                if (background === undefined) {
                    return theme.colors.useCases.surfaces.background;
                }

                if (background.type === "color") {
                    return theme.isDarkModeEnabled
                        ? background.colorOrUrlDark
                        : background.colorOrUrlLight;
                }

                return `center no-repeat url(${
                    theme.isDarkModeEnabled ? background.colorOrUrlDark : background.colorOrUrlLight
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
        "logoSvg": {
            "marginRight": 20,
            "display": "flex",
            "& svg": {
                "width": 40,
                "height": 40,
                "fill": theme.isDarkModeEnabled ? "white" : "black",
            },
        },
        "logo": {
            "marginRight": 20,
            "width": 40,
            "height": 40,
        },
        "column": {
            "margin": 40,

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
    }));

    return { useClassNames };
};

export const GlFooter = memo((props: GlFooter) => {
    const { licence, leftItems, rightItems, background, className } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({ background });

    return (
        <footer className={cx(classNames.root, className)}>
            <div className={classNames.wrapper}>
                {([leftItems, rightItems] as const).map((items, i) => (
                    <div className={classNames.column} key={i}>
                        {items.map(({ url, name, logoUrl }) => (
                            <Link href={url} key={url + name}>
                                {logoUrl !== undefined && (
                                    <GlLogo logoUrl={logoUrl} className={classNames.logoSvg} />
                                )}
                                <Typography>{name}</Typography>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            <p className={classNames.licence}>{licence}</p>
        </footer>
    );
});
