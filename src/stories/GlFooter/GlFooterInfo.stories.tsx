import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import { GlFooterInfo } from "../../GlFooter/GlFooterInfo";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlFooterInfo,
    },
});

export default meta;

export const Vue = getStory({
    "email": "williamalexthiery@hotmail.fr",
});
