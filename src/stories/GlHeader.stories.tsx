import { GlHeader } from "../GlHeader";
import type { GlHeaderProps } from "../GlHeader";
import { getStoryFactory } from "./getStory";
import { css } from "tss-react";

const { getStory, meta } = getStoryFactory({
    "wrappedComponent": { GlHeader },
});

export default meta;

/* spell-checker: disable */
const props: GlHeaderProps = {
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
/* spell-checker: enabled */

export const largeScreen = getStory({
    ...props,
    "className": css({
        "width": 1600,
    }),
});
