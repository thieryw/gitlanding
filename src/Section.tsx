/* eslint-disable @typescript-eslint/no-namespace */
import { Typography } from "onyxia-ui/Typography";
import ReactMarkdown from "react-markdown";
import { Image } from "./components/Image";
import { memo } from "react";
import type { ImageProps } from "./components/Image";
import { cx, css } from "tss-react";
import { Code } from "./components/Code";
import type { Props as CodeProps } from "./components/Code";
import { Button } from "./components/Button";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";
import { CardSection } from "./CardSection";
import type { CardSectionProps } from "./CardSection";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        isRowReverse: boolean | undefined;
    }>()((theme, { isRowReverse }) => ({
        "root": {
            "position": "relative",
            "marginTop": theme.spacing(17.25),
        },
        "smallThumbNails": {
            "display": "flex",
            "flexWrap": "wrap",
            "flexDirection": "row",
            "justifyContent": "center",
            "marginBottom": theme.spacing(17.25),
            "& >div": {
                "margin": theme.spacing(1.5),
            },
        },
        "title": {
            "fontSize": "40px",
            "textAlign": "center",
            "marginBottom": theme.spacing(7.5),
            ...(theme.responsive.down("sm")
                ? {
                      "textAlign": "left",
                      "paddingLeft": theme.spacing(4.5),
                      "paddingRight": theme.spacing(4.5),
                  }
                : {}),
        },
        "articleAndImageWrapper": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "marginTop": theme.spacing(17.25),
            ...(theme.responsive.down("sm")
                ? {
                      "flexDirection": "column-reverse",
                      "paddingLeft": theme.spacing(4.5),
                      "paddingRight": theme.spacing(4.5),
                  }
                : {
                      "flexDirection": isRowReverse ? "row-reverse" : "row",
                      "paddingLeft": theme.spacing(6),
                      "paddingRight": theme.spacing(6),
                  }),
        },
        "article": {
            "display": "flex",
            "flexDirection": "column",
            "textAlign": "left",
            [isRowReverse ? "marginLeft" : "marginRight"]: theme.spacing(
                theme.responsive.down("md") ? 1.5 : 16,
            ),
            "width": theme.responsive.down("md") ? 302 : 412,

            "& h2": {
                "marginBottom": 14,
            },
            "& p": {
                "fontSize": theme.typography.body1.fontSize,
                "lineHeight": "24px",
                "marginTop": 14,
                "marginBottom": 14,
            },
            ...(theme.responsive.down("sm")
                ? {
                      "width": "100%",
                      "margin": "unset",
                      "marginTop": theme.spacing(4),
                  }
                : {}),
        },

        "illustration": {
            "width": 900,
            [isRowReverse ? "marginRight" : "marginLeft"]: theme.spacing(16),
            ...(theme.responsive.down("md")
                ? {
                      [isRowReverse ? "marginRight" : "marginLeft"]: theme.spacing(1.5),
                      "width": 464,
                  }
                : {}),
            ...(theme.responsive.down("sm")
                ? {
                      "margin": "unset",
                      "width": "100%",
                  }
                : {}),
        },
        "button": {
            "color": "unset !important",
            "backgroundColor": "unset !important",
            "borderColor": "unset !important",
            "alignSelf": "right",
        },
    }));

    return { useClassNames };
};

declare namespace IllustrationProps {
    export type Code = {
        type: "code";
        codeProps: CodeProps;
    };

    export type Image = {
        type: "image";
        imageProps: ImageProps;
    };
}

export type SectionProps = {
    className?: string;
    cardSection?: CardSectionProps;
    illustration?: IllustrationProps.Code | IllustrationProps.Image;
    title?: string;
    article?: {
        title: string;
        /**
         * you can use markdown between back ticks.
         */
        paragraphMd: string;
        button?: {
            className?: string;
            title: string;
            href: string;
        };
    };
    isRowReverse?: boolean;
};

export const Section = memo((props: SectionProps) => {
    const { article, illustration, isRowReverse, className, cardSection, title } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        isRowReverse,
    });

    return (
        <section className={cx(classNames.root, className)}>
            {title && (
                <Typography className={classNames.title} variant="h2">
                    {title}
                </Typography>
            )}
            {<CardSection {...cardSection} />}
            <article className={classNames.articleAndImageWrapper}>
                {article && (
                    <div className={classNames.article}>
                        <Typography variant="h2">{article.title}</Typography>
                        <ReactMarkdown>{article.paragraphMd}</ReactMarkdown>
                        {article.button && (
                            <div
                                className={cx(
                                    css({
                                        "display": "flex",
                                        "justifyContent": "flex-end",
                                        "marginTop": 14,
                                    }),
                                    article.button.className,
                                )}
                            >
                                <Button
                                    className={classNames.button}
                                    type="submit"
                                    href={article.button.href}
                                >
                                    {article.button.title}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {illustration &&
                    (illustration.type === "image" ? (
                        <Image
                            url={illustration.imageProps?.url}
                            alt={illustration.imageProps?.alt}
                            className={cx(classNames.illustration, illustration.imageProps?.className)}
                        />
                    ) : (
                        <Code
                            text={illustration.codeProps?.text}
                            language={illustration.codeProps?.language}
                            showLineNumbers={illustration.codeProps?.showLineNumbers}
                            className={cx(classNames.illustration, illustration.codeProps?.className)}
                        />
                    ))}
            </article>
        </section>
    );
});
