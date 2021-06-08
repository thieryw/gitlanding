import { GitLandingHeader } from "../GitLandingHeader";
import type { GitLandingHeaderProps } from "../GitLandingHeader";
import { component } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { css } from "tss-react";
import headerImg from "../assets/header/header-img-example.png";

const { getStory, meta } = getStoryFactory({
    "sectionName": component,
    "wrappedComponent": { GitLandingHeader },
});

export default meta;

const props: GitLandingHeaderProps = {
    "image": {
        "url": headerImg,
    },
    "titleMd": "Espace documentaire pour la statistique publique",
    "subTitleMd": `
Ici je trouve et je partage des ressources 

sur le traitement statistique et la datascience.
`,
    "topBarProps": {
        "title": {
            "type": "markdown",
            "markdown": `Espace documentaire du SSP Cloud`,
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
    },

    "linkToNextSection": {
        "title": "Ce dont vous avez besoin :",
    },
};

export const largeScreen = getStory({
    ...props,
    "className": css({
        "width": 1920,
    }),
});
