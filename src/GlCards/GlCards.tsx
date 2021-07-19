/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import type { ReactNode } from "react";
import { Text } from "../theme";
import { makeStyles } from "../theme";

export type GlCardsProps = {
    className?: string;
    title?: string;
    children?: ReactNode;
};

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

export const GlCards = memo((props: GlCardsProps) => {
    const { title, children, className } = props;

    const { classes, cx } = useStyles();

    return (
        <section className={cx(classes.root, className)}>
            {title && (
                <Text className={classes.title} typo="page heading">
                    {title}
                </Text>
            )}
            <div className={classes.cards}>{children}</div>
        </section>
    );
});
