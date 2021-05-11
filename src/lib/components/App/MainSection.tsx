import Typography from "@material-ui/core/Typography";
import { createUseClassNames } from "../../theme/useClassesNames";
import { css, cx } from "tss-react";
import ReactMarkdown from "react-markdown";
import RoundedIcon from "@material-ui/icons/Brightness1Rounded";
import { memo } from "react";
import { useTheme } from "@material-ui/core/styles";
export type Props = {
    dataBlocks: {
        imageUrl: string;
        imageHasFrame: boolean;
        article: {
            title: string;
            /**
             * you can use markdown between back ticks.
             */
            paragraphMd: string;
        };
    }[];
};

const { useClassNames } = createUseClassNames()(theme => ({
    "root": {
        "padding": "40px 0 40px 0",
        "& >article": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "padding": "40px 0 40px 0",
            "@media (max-width: 895px)": {
                "padding": 0,
            },

            "& >div": {
                "width": 500,
                "margin": "0 40px 0 40px",
                "& h4": {
                    "marginBottom": 20,
                },
                "@media (max-width: 895px)": {
                    "marginBottom": 40,
                    "width": "80%",
                },
            },
        },
    },
    "imageWrapper": {
        "position": "relative",
        "width": 550,
        "margin": "0 40px 0 40px",
        "boxShadow": theme.palette.type === "dark" ? "" : "-2px 0px 10px 0px rgba(0,0,0,0.75)",
        "@media (max-width: 1215px)": {
            "width": "45%",
        },
        "@media (max-width: 895px)": {
            "width": "80%",
        },
        "& >img": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover",
            "verticalAlign": "middle",
        },
    },
}));

export const MainSection = (props: Props) => {
    const { dataBlocks } = props;

    const { classNames } = useClassNames({});

    const theme = useTheme();

    return (
        <section className={classNames.root}>
            {dataBlocks.map((dataBlock, index) => (
                <article
                    key={JSON.stringify(dataBlock.article.title + index)}
                    className={css({
                        "flexDirection": index % 2 !== 0 ? "row-reverse" : "row",
                        "@media (max-width: 895px)": {
                            "flexDirection": "column",
                        },
                    })}
                >
                    <div>
                        <Typography variant="h5">{dataBlock.article.title}</Typography>

                        <ReactMarkdown>{dataBlock.article.paragraphMd}</ReactMarkdown>
                    </div>
                    <div
                        className={cx(
                            classNames.imageWrapper,
                            css({
                                "borderRadius": dataBlock.imageHasFrame ? 5 : "",
                                "border": dataBlock.imageHasFrame
                                    ? `solid ${theme.custom.color.palette.visualStudioCodeColor} 20px`
                                    : "",
                            }),
                        )}
                    >
                        {dataBlock.imageHasFrame && <VsCodeButtons />}

                        <img src={dataBlock.imageUrl} alt="source code" />
                    </div>
                </article>
            ))}
        </section>
    );
};

const { VsCodeButtons } = (() => {
    const { useClassNames } = createUseClassNames()(() => ({
        "roundedIcons": {
            "position": "absolute",
            "top": -20,
            "left": -15,
            "display": "flex",
            "& >svg": {
                "width": 15,
                "margin": "0 2px 0 2px",
            },
        },
    }));

    const VsCodeButtons = memo(() => {
        const { classNames } = useClassNames({});
        const { vsCodeTopLeftButtonColors } = useTheme().custom.color.useCases;

        return (
            <div className={classNames.roundedIcons}>
                {Object.values(vsCodeTopLeftButtonColors).map(color => (
                    <RoundedIcon
                        key={color}
                        className={css({
                            "fill": color,
                        })}
                    />
                ))}
            </div>
        );
    });

    return { VsCodeButtons };
})();
