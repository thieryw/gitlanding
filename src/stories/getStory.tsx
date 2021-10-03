import type { Meta, Story } from "@storybook/react";
import type { ArgType } from "@storybook/addons";
import { useEffect, useCallback, useMemo, memo } from "react";
import { symToStr } from "tsafe/symToStr";
import {
    useIsDarkModeEnabled,
    chromeFontSizesFactors,
    breakpointsValues,
} from "onyxia-ui";
import { useWindowInnerSize } from "powerhooks/useWindowInnerSize";
import type { ThemeProviderProps, ChromeFontSize } from "onyxia-ui";
import {
    ThemeProviderDefault as ThemeProvider,
    Text,
    useTheme,
} from "../theme";
import { id } from "tsafe/id";
import "onyxia-ui/assets/fonts/work-sans.css";
import { GlobalStyles } from "tss-react";
import { objectKeys } from "tsafe/objectKeys";
import type { ReactNode } from "react";

export function getStoryFactory<Props>(params: {
    sectionName: string;
    wrappedComponent: Record<string, (props: Props) => ReturnType<React.FC>>;
    /** https://storybook.js.org/docs/react/essentials/controls */
    argTypes?: Partial<Record<keyof Props, ArgType>>;
    defaultWidth?: number;
}) {
    const {
        sectionName,
        wrappedComponent,
        argTypes = {},
        defaultWidth,
    } = params;

    const Component: React.ComponentType<Props> = Object.entries(
        wrappedComponent,
    ).map(([, component]) => component)[0];

    function ScreenSize() {
        const { windowInnerWidth } = useWindowInnerSize();

        const range = useMemo(() => {
            if (windowInnerWidth >= breakpointsValues["xl"]) {
                return "xl-∞";
            }

            if (windowInnerWidth >= breakpointsValues["lg"]) {
                return "lg-xl";
            }

            if (windowInnerWidth >= breakpointsValues["md"]) {
                return "md-lg";
            }

            if (windowInnerWidth >= breakpointsValues["sm"]) {
                return "sm-md";
            }

            return "0-sm";
        }, [windowInnerWidth]);

        return (
            <Text typo="body 1">
                {windowInnerWidth}px width: {range}
            </Text>
        );
    }

    const Template: Story<
        Props & {
            darkMode: boolean;
            width: number;
            chromeFontSize: ChromeFontSize;
            targetWindowInnerWidth: number;
        }
    > = ({
        darkMode,
        width,
        targetWindowInnerWidth,
        chromeFontSize,
        ...props
    }) => {
        const { setIsDarkModeEnabled } = useIsDarkModeEnabled();

        useEffect(() => {
            setIsDarkModeEnabled(darkMode);
        }, [darkMode]);

        const getViewPortConfig = useCallback<
            NonNullable<ThemeProviderProps["getViewPortConfig"]>
        >(
            ({ windowInnerWidth }) => ({
                "targetBrowserFontSizeFactor":
                    chromeFontSizesFactors[chromeFontSize],
                "targetWindowInnerWidth":
                    targetWindowInnerWidth || windowInnerWidth,
            }),
            [targetWindowInnerWidth, chromeFontSize],
        );

        return (
            <ThemeProvider getViewPortConfig={getViewPortConfig}>
                <ContentWrapper
                    width={width}
                    ScreenSize={ScreenSize}
                    Component={<Component {...(props as any)} />}
                />
            </ThemeProvider>
        );
    };

    function getStory(props: Props): typeof Template {
        const out = Template.bind({});

        out.args = {
            "darkMode": false,
            "width": defaultWidth ?? 0,
            "targetWindowInnerWidth": 0,
            "chromeFontSize": "Medium (Recommended)",
            ...props,
        };

        return out;
    }

    return {
        "meta": id<Meta>({
            "title": `${sectionName}/${symToStr(wrappedComponent)}`,
            "component": Component,
            "argTypes": {
                "width": {
                    "control": {
                        "type": "range",
                        "min": 0,
                        "max": 1920,
                        "step": 1,
                    },
                },
                "targetWindowInnerWidth": {
                    "control": {
                        "type": "range",
                        "min": 0,
                        "max": 2560,
                        "step": 10,
                    },
                },
                "chromeFontSize": {
                    "options": objectKeys(chromeFontSizesFactors),
                    "control": { "type": "select" },
                },
                ...argTypes,
            },
        }),
        getStory,
    };
}

export function logCallbacks<T extends string>(
    propertyNames: readonly T[],
): Record<T, () => void> {
    const out: Record<T, () => void> = id<Record<string, never>>({});

    propertyNames.forEach(
        propertyName =>
            (out[propertyName] = console.log.bind(console, propertyName)),
    );

    return out;
}

const { ContentWrapper } = (() => {
    type Props = {
        ScreenSize: () => JSX.Element;
        width: number;
        Component: ReactNode;
    };

    const ContentWrapper = memo((props: Props) => {
        const { Component, ScreenSize, width } = props;

        const theme = useTheme();

        return (
            <>
                <GlobalStyles
                    styles={{
                        "html": {
                            "font-size": "100% !important",
                        },
                        "body": {
                            "padding": `0 !important`,
                            "backgroundColor": `${theme.colors.useCases.surfaces.background} !important`,
                        },
                    }}
                />
                <ScreenSize />
                <div
                    style={{
                        "width": width || undefined,
                        "border": "1px dotted grey",
                        "display": "inline-block",
                    }}
                >
                    {Component}
                </div>
            </>
        );
    });

    return { ContentWrapper };
})();
