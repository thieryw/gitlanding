import Typography from "@material-ui/core/Typography";
import { createUseClassNames } from "../../theme/useClassesNames";
import { css, cx } from "tss-react";
import ReactMarkdown from "react-markdown";
import RoundedIcon from "@material-ui/icons/Brightness1Rounded";
import { useTheme } from "@material-ui/core/styles";
export type Props = {
    dataBlocks: {
        imageUrl: string;
        imageHasFrame: boolean;
        text: {
            title: string;
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
        "boxShadow": theme.palette.type === "dark" ? "" : "0px 1px 58px 17px rgba(0,0,0,0.75)",
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

export const MainSection = (props: Props) => {
    const { dataBlocks } = props;

    const { classNames } = useClassNames({});

    const theme = useTheme();

    return (
        <section className={classNames.root}>
            {dataBlocks.map((dataBlock, index) => (
                <article
                    key={JSON.stringify(dataBlock.text.title + index)}
                    className={css({
                        "flexDirection": index % 2 !== 0 ? "row-reverse" : "row",
                        "@media (max-width: 895px)": {
                            "flexDirection": "column",
                        },
                    })}
                >
                    <div>
                        <Typography variant="h5">{dataBlock.text.title}</Typography>

                        <ReactMarkdown>{dataBlock.text.paragraphMd}</ReactMarkdown>
                    </div>
                    <div
                        className={cx(
                            classNames.imageWrapper,
                            css({
                                "borderRadius": dataBlock.imageHasFrame ? 5 : "",
                                "border": dataBlock.imageHasFrame
                                    ? `solid ${theme.custom.visualStudioCodeColor} 20px`
                                    : "",
                            }),
                        )}
                    >
                        {dataBlock.imageHasFrame && (
                            <div className={classNames.roundedIcons}>
                                {Object.values(theme.custom.vsCodeTopLeftButtonColors).map(color => (
                                    <RoundedIcon
                                        key={color}
                                        className={css({
                                            "fill": color,
                                        })}
                                    />
                                ))}
                            </div>
                        )}

                        <img src={dataBlock.imageUrl} alt="source code" />
                    </div>
                </article>
            ))}
        </section>
    );
};
