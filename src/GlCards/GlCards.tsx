/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import type { ReactNode } from "react";
import { Typography } from "onyxia-ui/Typography";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { cx } from "tss-react";

export type GlCardsProps = {
    className?: string;
    title?: string;
    children?: ReactNode;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }>()(theme => ({
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

    return { useClassNames };
};
export const GlCards = memo((props: GlCardsProps) => {
    const { title, children, className } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <section className={cx(classNames.root, className)}>
            {title && (
                <Typography className={classNames.title} variant="h2">
                    {title}
                </Typography>
            )}
            <div className={classNames.cards}>{children}</div>
        </section>
    );
});
