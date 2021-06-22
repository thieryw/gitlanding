import { GlProjectCard } from "../../GlCards/GlProjectCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlProjectCard,
    },
});

export default meta;

export const Vue = getStory({
    "button": {
        "title": "Lorem Ipsum",
    },
    "footer": {
        "title": "gloria in excelsis deo",
        "subTitle": "et in terra pax homínibus bonae voluntátis",
    },
    "background": {
        "type": "color",
        "color": "blue",
    },
});
