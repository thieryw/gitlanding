import { GithubStarCount } from "../components/GithubStarCount";
import { designSystem } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { getStory, meta } = getStoryFactory({
    "sectionName": designSystem,
    "wrappedComponent": { GithubStarCount },
});

export default meta;

export const Vue = getStory({
    "size": "normal",
    "repoUrl": "",
});
