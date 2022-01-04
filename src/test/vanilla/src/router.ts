import { createRouter, defineRoute } from "type-route";

export const routeDefs = {
    "home": defineRoute("/"),
    "link1": defineRoute("/link1"),
    "link2": defineRoute("/link2"),
    "link3": defineRoute("/link3"),
};

export const { RouteProvider, routes, useRoute } = createRouter(routeDefs);
