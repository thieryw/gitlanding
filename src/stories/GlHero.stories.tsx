import { GlHero } from "../GlHero";
import type { GlHeroProps } from "../GlHero";
import { getStoryFactory } from "./getStory";
import { css } from "tss-react";
import headerImg from "../assets/header/header-img-example.png";

const { getStory, meta } = getStoryFactory({
    "wrappedComponent": { GlHero },
});

export default meta;

/* spell-checker: disable */
const props: GlHeroProps = {
    "image": {
        "url": headerImg,
    },
    "titleMd": "Espace documentaire pour la statistique publique",
    "subTitleMd": [
        "Ici je trouve et je partage des ressources",
        "sur le traitement statistique et la datascience.",
    ].join("\n"),
    "scrollDownButton": {
        "title": "Ce dont vous avez besoin :",
        "href": "#",
    },
};
/* spell-checker: enable */

export const VueLargeScreen = getStory({
    ...props,
    "className": css({ "width": 900 }),
});
