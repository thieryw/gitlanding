import { getStoryFactory } from "../../getStory";
import { GlCodeBlock } from "GlCodeBlock";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlCodeBlock },
});

export default meta;

export const Vue = getStory({
    "hasShadow": true,
    "language": "typescript",
    "text": `declare function listFilesOfDirectory(dirPath: string): string[];
declare function isDirectory(): boolean;

function getAllFiles(startFileName: string) {
	const result: string[] = [];
	traverse(startFileName);
	return result;
	function traverse(currentPath: string) {
		return isDirectory
			? 
				listFilesOfDirectory(currentPath).forEach(traverse)
			: result.push(currentPath);
	}
}
	`,
});
