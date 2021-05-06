import { createRouter, defineRoute } from "type-route";
import { makeThisModuleAnExecutableRouteLister } from "github-pages-plugin-for-type-route";

export const routeDefs = {
    "home": defineRoute("/")
};

makeThisModuleAnExecutableRouteLister(routeDefs);

export const { RouteProvider, useRoute, routes } = createRouter(
    { "scrollToTop": false },
    routeDefs
);