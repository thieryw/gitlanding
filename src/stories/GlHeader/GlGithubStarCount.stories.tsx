import { GlGithubStarCount } from "../../GlHeader/GlGithubStarCount";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlGithubStarCount },
});

export default meta;

export const VueDefault = getStory({
    "size": "large",
    "repoUrl": "",
});
