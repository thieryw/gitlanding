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
    children: ReactNode;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }>()(theme => ({
        "root": {
            "marginBottom": theme.spacing(5),
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
            "marginBottom": theme.spacing(7.5),
            "marginTop": theme.spacing(17.25),
            ...(theme.responsive.down("sm")
                ? {
                      "marginTop": theme.spacing(8),
                  }
                : {}),
        },

        "seeMoreLink": {
            "color": theme.colors.palette.orangeWarning.main,
            "cursor": "pointer",
        },

        "sectionTitle": {
            "marginLeft": theme.spacing(2),
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
                "flex": `1 1 33%`,

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
                <Typography className={classNames.sectionTitle} variant="h2">
                    {title}
                </Typography>
            )}
            <div className={classNames.cards}>{children}</div>
        </section>
    );
});
