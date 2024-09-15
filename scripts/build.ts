import * as child_process from "child_process";
import { join as pathJoin } from "path";
import { transformCodebase } from "./tools/transformCodebase";
import { getThisCodebaseRootDirPath } from "./tools/getThisCodebaseRootDirPath";

console.log("Building vite-envs...");

const startTime = Date.now();

run(`npx tsc`);

transformCodebase({
    srcDirPath: pathJoin(getThisCodebaseRootDirPath(), "src", "assets"),
    destDirPath: pathJoin(getThisCodebaseRootDirPath(), "dist", "assets"),
});

console.log(`✓ built in ${((Date.now() - startTime) / 1000).toFixed(2)}s`);

function run(command: string) {
    console.log(`$ ${command}`);

    child_process.execSync(command, { stdio: "inherit" });
}
