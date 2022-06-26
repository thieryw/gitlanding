import { getStoryFactory } from "../../getStory";
import { GlIconButton } from "utils/GlIconButton";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlIconButton },
});

export default meta;

export const VueArrowBackIos = getStory({
    "iconId": "arrowBackIos",
    "size": "large",
    "onClick": () => console.log("click"),
});

export const VueArrowForwardIos = getStory({
    "iconId": "arrowForwardIos",
    "size": "large",
    "onClick": () => console.log("click"),
});

export const VueBrightness1Rounded = getStory({
    "iconId": "brightness1Rounded",
    "size": "large",
    "onClick": () => console.log("click"),
});

export const VueBrightness4 = getStory({
    "iconId": "brightness4",
    "size": "large",
    "onClick": () => console.log("click"),
});

export const VueBrightness7 = getStory({
    "iconId": "brightness7",
    "size": "large",
    "onClick": () => console.log("click"),
});

export const VueDehaze = getStory({
    "iconId": "dehaze",
    "size": "large",
    "onClick": () => console.log("click"),
});
