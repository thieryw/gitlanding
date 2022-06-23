import { memo, useEffect } from "react";
import type { ReactNode } from "react";
import { createThemeProvider } from "onyxia-ui";
import type { Meta, Story } from "@storybook/react";
import type { ArgType } from "@storybook/addons";
import { id } from "tsafe/id";
import { symToStr } from "tsafe/symToStr";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";

const { ThemeProvider } = createThemeProvider({});

export function getStoryFactory<Props>(params: {
    sectionName: string;
    wrappedComponent: Record<string, (props: Props) => ReturnType<React.FC>>;
    defaultWidth?: number;
    argTypes?: Partial<Record<keyof Props, ArgType>>;
}) {
    const {
        wrappedComponent,
        sectionName,
        defaultWidth,
        argTypes = {},
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
        return (
            <div
                style={{
                    "maxWidth": width,
                }}
            >
                {Component}
            </div>
        );
    });

    return { ContentWrapper };
})();
