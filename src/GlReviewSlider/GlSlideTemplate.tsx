import { makeStyles, Text } from "../theme";
import { GlSlide } from "./GlSlide";
import { memo } from "react";
import { GlLogo } from "../utils/GlLogo";
import Paper from "@material-ui/core/Paper";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles()(theme => ({
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
        "margin": theme.spacing(5),
        "fontSize": theme.typography.variants["body 1"].style.fontSize,
        "fontWeight": theme.typography.variants["body 1"].style.fontWeight,
        "lineHeight": theme.typography.variants["body 1"].style.lineHeight,
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
        "& svg": {
            "width": 70,
            "height": 70,
        },
        ...(theme.responsive.down("md")
            ? {
                  "marginLeft": 0,
                  "marginTop": theme.spacing(5),
              }
            : {}),
    },
}));

export type GlSlideTemplateProps = {
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

export const GlSlideTemplate = memo((props: GlSlideTemplateProps) => {
    const { descriptionMd, className, signature, logoUrl } = props;

    const { classes } = useStyles();

    return (
        <GlSlide className={className}>
            <Paper className={classes.root}>
                {logoUrl !== undefined && (
                    <GlLogo logoUrl={logoUrl} className={classes.logo} />
                )}
                <div>
                    {descriptionMd !== undefined && (
                        <ReactMarkdown className={classes.paragraph}>
                            {descriptionMd}
                        </ReactMarkdown>
                    )}
                    {signature !== undefined && (
                        <Text typo="body 2" className={classes.signature}>
                            {signature}
                        </Text>
                    )}
                </div>
            </Paper>
        </GlSlide>
    );
});
