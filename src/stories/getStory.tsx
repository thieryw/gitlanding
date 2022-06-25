import { memo, useEffect } from "react";
import type { ReactNode } from "react";
import { createThemeProvider } from "onyxia-ui";
import type { Meta, Story } from "@storybook/react";
import type { ArgType } from "@storybook/addons";
import { id } from "tsafe/id";
import { symToStr } from "tsafe/symToStr";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";
import type { Parameters } from "@storybook/react";

export const { useTheme, StoryProvider, ThemeProvider } = createThemeProvider(
    {},
);

export const StoryProviderWrapper = memo((props: { children: JSX.Element }) => {
    const { children } = props;
    const { colors } = useTheme();
    return (
        <div
            style={{
                "overflow": "hidden",
                "backgroundColor": colors.palette.light.main,
            }}
        >
            <StoryProvider>{children}</StoryProvider>
        </div>
    );
});

export function getStoryFactory<Props>(params: {
    sectionName: string;
    wrappedComponent: Record<string, (props: Props) => ReturnType<React.FC>>;
    defaultWidth?: number;
    argTypes?: Partial<Record<keyof Props, ArgType>>;
    parameters?: Parameters;
}) {
    const {
        wrappedComponent,
        sectionName,
        defaultWidth,
        argTypes = {},
        parameters,
    } = params;
    const title = `${sectionName}/${symToStr(wrappedComponent)}`;

    const Component: React.ComponentType<Props> = Object.entries(
        wrappedComponent,
    ).map(([, component]) => component)[0];

    const Template: Story<Props & { darkMode: boolean }> = args => {
        const { darkMode } = args;
        const { setIsDarkModeEnabled } = useIsDarkModeEnabled();
        useEffect(() => {
            setIsDarkModeEnabled(darkMode);
        }, [darkMode]);

        return (
            <ThemeProvider>
                <ContentWrapper
                    Component={<Component {...args} />}
                    width={defaultWidth}
                />
            </ThemeProvider>
        );
    };

    const getStory = (props: Props): typeof Template => {
        const out = Template.bind({});
        out.args = {
            "darkMode": true,
            ...props,
        };
        return out;
    };

    return {
        "meta": id<Meta>({
            title,
            "component": Component,
            "argTypes": {
                ...argTypes,
            },
            parameters,
        }),
        getStory,
    };
}

const { ContentWrapper } = (() => {
    type Props = {
        width?: number;
        Component: ReactNode;
    };
    const ContentWrapper = memo((props: Props) => {
        const { Component, width } = props;
        const { colors } = useTheme();
        return (
            <div
                style={{
                    "maxWidth": width,
                    "backgroundColor": colors.useCases.surfaces.background,
                    "overflow": "hidden",
                }}
            >
                {Component}
            </div>
        );
    });

    return { ContentWrapper };
})();
