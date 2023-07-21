import { execSync } from "child_process";
import { join as pathJoin, relative as pathRelative } from "path";
import { exclude } from "tsafe/exclude";
import * as fs from "fs";

// npx ts-node --skip-project scripts/link-in-external-project.ts www.tss-react.dev

const rootDirPath = pathJoin(__dirname, "..");

//NOTE: This is only required because of: https://github.com/garronej/ts-ci/blob/c0e207b9677523d4ec97fe672ddd72ccbb3c1cc4/README.md?plain=1#L54-L58
fs.writeFileSync(
    pathJoin(rootDirPath, "dist", "package.json"),
    Buffer.from(
        JSON.stringify(
            (() => {
                const packageJsonParsed = JSON.parse(
                    fs
                        .readFileSync(pathJoin(rootDirPath, "package.json"))
                        .toString("utf8"),
                );

                return {
                    ...packageJsonParsed,
                    "main": packageJsonParsed["main"]?.replace(/^dist\//, ""),
                    "types": packageJsonParsed["types"]?.replace(/^dist\//, ""),
                    "module": packageJsonParsed["module"]?.replace(
                        /^dist\//,
                        "",
                    ),
                    "bin": !("bin" in packageJsonParsed)
                        ? undefined
                        : Object.fromEntries(
                              Object.entries(packageJsonParsed["bin"]).map(
                                  ([key, value]) => [
                                      key,
                                      (value as string).replace(/^dist\//, ""),
                                  ],
                              ),
                          ),
                    "exports": !("exports" in packageJsonParsed)
                        ? undefined
                        : Object.fromEntries(
                              Object.entries(packageJsonParsed["exports"]).map(
                                  ([key, value]) => [
                                      key,
                                      (value as string).replace(
                                          /^\.\/dist\//,
                                          "./",
                                      ),
                                  ],
                              ),
                          ),
                };
            })(),
            null,
            2,
        ),
        "utf8",
    ),
);

const commonThirdPartyDeps = (() => {
    const namespaceModuleNames = ["@emotion", "@mui"];
    const standaloneModuleNames = [
        "react",
        "@types/react",
        "onyxia-ui",
        "powerhooks",
    ];

    return [
        ...namespaceModuleNames
            .map(namespaceModuleName =>
                fs
                    .readdirSync(
                        pathJoin(
                            rootDirPath,
                            "node_modules",
                            namespaceModuleName,
                        ),
                    )
                    .map(
                        submoduleName =>
                            `${namespaceModuleName}/${submoduleName}`,
                    ),
            )
            .reduce((prev, curr) => [...prev, ...curr], []),
        ...standaloneModuleNames,
    ];
})();

const yarnHomeDirPath = pathJoin(rootDirPath, ".yarn_home");

fs.rmSync(yarnHomeDirPath, { "recursive": true, "force": true });
fs.mkdirSync(yarnHomeDirPath);

const execYarnLink = (params: { targetModuleName?: string; cwd: string }) => {
    const { targetModuleName, cwd } = params;

    const cmd = [
        "yarn",
        "link",
        ...(targetModuleName !== undefined ? [targetModuleName] : []),
    ].join(" ");

    console.log(`$ cd ${pathRelative(rootDirPath, cwd) || "."} && ${cmd}`);

    execSync(cmd, {
        cwd,
        "env": {
            ...process.env,
            "HOME": yarnHomeDirPath,
        },
    });
};

const testAppPaths = (() => {
    const [, , ...testAppNames] = process.argv;

    return testAppNames
        .map(testAppName => {
            const testAppPath = pathJoin(rootDirPath, "..", testAppName);

            if (fs.existsSync(testAppPath)) {
                return testAppPath;
            }

            console.warn(
                `Skipping ${testAppName} since it cant be found here: ${testAppPath}`,
            );

            return undefined;
        })
        .filter(exclude(undefined));
})();

if (testAppPaths.length === 0) {
    console.error("No test app to link into!");
    process.exit(-1);
}

testAppPaths.forEach(testAppPath =>
    execSync("yarn install", { "cwd": testAppPath }),
);

console.log("=== Linking common dependencies ===");

const total = commonThirdPartyDeps.length;
let current = 0;

commonThirdPartyDeps.forEach(commonThirdPartyDep => {
    current++;

    console.log(`${current}/${total} ${commonThirdPartyDep}`);

    const localInstallPath = pathJoin(
        ...[
            rootDirPath,
            "node_modules",
            ...(commonThirdPartyDep.startsWith("@")
                ? commonThirdPartyDep.split("/")
                : [commonThirdPartyDep]),
        ],
    );

    execYarnLink({ "cwd": localInstallPath });
});

commonThirdPartyDeps.forEach(commonThirdPartyDep =>
    testAppPaths.forEach(testAppPath =>
        execYarnLink({
            "cwd": testAppPath,
            "targetModuleName": commonThirdPartyDep,
        }),
    ),
);

console.log("=== Linking in house dependencies ===");

execYarnLink({ "cwd": pathJoin(rootDirPath, "dist") });

testAppPaths.forEach(testAppPath =>
    execYarnLink({
        "cwd": testAppPath,
        "targetModuleName": JSON.parse(
            fs
                .readFileSync(pathJoin(rootDirPath, "package.json"))
                .toString("utf8"),
        )["name"],
    }),
);

export {};
