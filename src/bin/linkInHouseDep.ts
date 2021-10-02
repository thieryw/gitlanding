import {symlinkSync, rmSync, existsSync, lstatSync, unlinkSync} from "fs";
import {join} from "path";

function deleteFileOrSymLink(path: string){

	if(!existsSync(path)){
		return;
	};

	if(lstatSync(path).isDirectory()){
		rmSync(path, {"recursive": true, "force": true});
		return;
	};

	unlinkSync(path);
}


function linkInHouseDep(params: {
	moduleToLinkPath: string;
	node_modulePath: string;
}){
	const {moduleToLinkPath ,node_modulePath} = params;

	const regex = /\w+$/g
	const moduleName = moduleToLinkPath.slice(moduleToLinkPath.search(regex), moduleToLinkPath.length);
	const pathToNodeModule = join(node_modulePath, moduleName);
	const pathToReactInTargetModule = join(moduleToLinkPath, "node_modules", "react");

	deleteFileOrSymLink(pathToNodeModule);
	deleteFileOrSymLink(pathToReactInTargetModule);

	symlinkSync(join(moduleToLinkPath, "dist"), join(node_modulePath, moduleName));
	symlinkSync(join(node_modulePath, "react"), join(moduleToLinkPath, "node_modules", "react"));

};

linkInHouseDep({
	"moduleToLinkPath": join(__dirname, "..", "..", "..", "gitlanding"),
	"node_modulePath": join(__dirname, "..", "..", "node_modules")
});
