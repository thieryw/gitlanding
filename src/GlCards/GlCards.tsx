/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import type { ReactNode } from "react";
import { Typography } from "onyxia-ui/Typography";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlCardsProps = {
    className?: string;
    title?: string;
    children?: ReactNode;
};

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles()(theme => ({
        "root": {
            ...(() => {
                const value = theme.spacing(12.5);

                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                };
            })(),

            ...(theme.responsive.down("lg")
                ? {
                      ...(() => {
                          const value = theme.spacing(1);

                          return {
                              "paddingLeft": value,
                              "paddingRight": value,
                          };
                      })(),
                  }
                : {}),
        },

        "title": {
            "textAlign": "center",
            ...(() => {
                const value = theme.spacing(5);
                return {
                    "marginTop": value,
                    "marginBottom": value,
                };
            })(),
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "22px",
                      "lineHeight": "24px",
                  }
                : {}),
        },

        "cards": {
            "display": "flex",
            "flexWrap": "wrap",
            "& > *": {
                "flex": `1 1 30%`,
                ...(theme.responsive.down(1400)
                    ? {
                          "flex": "1 1 40%",
                      }
                    : {}),
                ...(theme.responsive.down(686)
                    ? {
                          "flex": "1 1 100%",
                      }
                    : {}),
            },
        },
    }));

    return { useStyles };
};
export const GlCards = memo((props: GlCardsProps) => {
    const { title, children, className } = props;

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles();

    return (
        <section className={cx(classes.root, className)}>
            {title && (
                <Typography className={classes.title} variant="h2">
                    {title}
                </Typography>
            )}
            <div className={classes.cards}>{children}</div>
        </section>
    );
});
