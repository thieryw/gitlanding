import { getThemeApi } from "../theme";
import { GlSlideTemplate } from "./GlSlideTemplate";
import { memo } from "react";
import { GlLogo } from "../utils/GlLogo";
import Paper from "@material-ui/core/Paper";
import { Typography } from "onyxia-ui/Typography";
import { useGuaranteedMemo } from "powerhooks";
import ReactMarkdown from "react-markdown";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "display": "flex",
            "flexDirection": "row",
            "alignItems": "center",
            "justifyContent": "space-between",
            "position": "relative",
            ...(theme.responsive.down("md")
                ? {
                      "flexDirection": "column",
                  }
                : {}),
        },

        "paragraph": {
            "margin": 40,
            "fontSize": theme.typography.body1.fontSize,
            "fontWeight": theme.typography.body1.fontWeight,
            "lineHeight": theme.typography.body1.lineHeight,
            ...(theme.responsive.down("md")
                ? {
                      "textAlign": "center",
                  }
                : {}),
            ...(theme.responsive.down("sm")
                ? {
                      ...(() => {
                          const valueVertical = theme.spacing(1);
                          const valueHorizontal = theme.spacing(5);

                          return {
                              "marginTop": valueVertical,
                              "marginBottom": valueVertical,
                              "marginLeft": valueHorizontal,
                              "marginRight": valueHorizontal,
                          };
                      })(),
                  }
                : {}),
        },

        "signature": {
            "textAlign": "right",
            "fontStyle": "italic",
            "marginRight": theme.spacing(5),
            "marginBottom": theme.spacing(5),

            ...(theme.responsive.down("md")
                ? {
                      "textAlign": "center",
                      "marginRight": 0,
                  }
                : {}),
        },
        "logo": {
            "width": 70,
            "marginLeft": theme.spacing(5),
            "fill": theme.isDarkModeEnabled ? "white" : "black",
            "& svg": {
                "width": 70,
                "height": 70,
            },
            "@media (max-width: 1000px)": {
                "marginLeft": 0,
                "marginTop": 40,
            },
            ...(theme.responsive.down("md")
                ? {
                      "marginLeft": 0,
                      "marginTop": theme.spacing(5),
                  }
                : {}),
        },
    }));

    return { useClassNames };
};

export type GlSlideProps = {
    /**
     * you can use markdown between back ticks.
     */
    descriptionMd?: string;
    signature?: string;
    /**
     * If you use an svg image that does not have a fill,
     * the fill will be set to the current font color,
     * depending on the dark mode being active.
     */
    logoUrl?: string;
    className?: string;
};

export const GlSlide = memo((props: GlSlideProps) => {
    const { descriptionMd, className, signature, logoUrl } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <GlSlideTemplate className={className}>
            <Paper className={classNames.root}>
                {logoUrl !== undefined && (
                    <GlLogo logoUrl={logoUrl} className={classNames.logo} />
                )}
                <div>
                    {descriptionMd !== undefined && (
                        <ReactMarkdown className={classNames.paragraph}>
                            {descriptionMd}
                        </ReactMarkdown>
                    )}
                    {signature !== undefined && (
                        <Typography className={classNames.signature}>
                            {signature}
                        </Typography>
                    )}
                </div>
            </Paper>
        </GlSlideTemplate>
    );
});
