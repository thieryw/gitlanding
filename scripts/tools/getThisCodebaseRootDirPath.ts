import * as fs from "fs";
import { join as pathJoin } from "path";

function getThisCodebaseRootDirPath_rec(dirPath: string): string {
    if (fs.existsSync(pathJoin(dirPath, "package.json"))) {
        return dirPath;
    }
    return getThisCodebaseRootDirPath_rec(pathJoin(dirPath, ".."));
}

let result: string | undefined = undefined;

export function getThisCodebaseRootDirPath(): string {
    if (result !== undefined) {
        return result;
    }

    return (result = getThisCodebaseRootDirPath_rec(__dirname));
}
