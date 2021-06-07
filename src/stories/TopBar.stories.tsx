import { TopBar } from "../TopBar";
import type { Props } from "../TopBar";
import { designSystem } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { css } from "tss-react";

const { getStory, meta } = getStoryFactory({
    "sectionName": designSystem,
    "wrappedComponent": { TopBar },
});

export default meta;

const props: Props = {
    "title": {
        "type": "markdown",
        "markdown": `Espace documentaire du **SSP Cloud**`,
    },
    "menuItems": [
        {
            "name": "Documentation",
            "url": "",
        },
        {
            "name": "Le datalab",
            "url": "",
        },
        {
            "name": "Contribuer",
            "url": "",
        },
        {
            "name": "Actualités et projets",
            "url": "",
        },
    ],
};

export const largeScreen = getStory({
    ...props,
    "className": css({
        "width": 1600,
    }),
});
