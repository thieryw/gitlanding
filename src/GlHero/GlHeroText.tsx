import { Text } from "../theme";
import { memo } from "react";
import type { ReactNode } from "react";
import { tss } from "../theme";
import { breakpointsValues } from "../theme";

export type GlHeroTextProps = {
    className?: string;
    children: NonNullable<ReactNode>;
};

export const GlHeroText = memo((props: GlHeroTextProps) => {
    const { children, className } = props;

    const { classes, cx } = useStyles();

    return (
        <Text
            className={cx(classes.root, className)}
            htmlComponent="h1"
            typo="body 1"
        >
            {children}
        </Text>
    );
});

const useStyles = tss.withName({ GlHeroText }).create(({ theme }) => ({
    "root": {
        "fontWeight": 700,
        ...(() => {
            const value =
                (theme.typography.rootFontSizePx / 16) *
                (() => {
                    if (theme.windowInnerWidth >= breakpointsValues.xl) {
                        return 86;
                    }

                    if (theme.windowInnerWidth >= 600) {
                        return 52;
                    }

                    return 36;
                })();

            return {
                "fontSize": value,
                "lineHeight": `${value}px`,
            };
        })(),
    },
}));
