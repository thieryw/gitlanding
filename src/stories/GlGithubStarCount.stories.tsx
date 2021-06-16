import { GlGithubStarCount } from "../GlGithubStarCount";
import { getStoryFactory } from "./getStory";

const { getStory, meta } = getStoryFactory({
    "wrappedComponent": { GlGithubStarCount },
});

export default meta;

export const VueDefault = getStory({
    "size": "normal",
    "repoUrl": "",
});
