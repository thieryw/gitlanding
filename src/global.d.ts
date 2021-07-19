declare module "*.svg" {
    import * as React from "react";

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    const src: string;
    export default src;
}

declare module "*.png" {
    const _default: string;
    export default _default;
}

declare module "*.css" {
    const _default: string;
    export default _default;
}

declare module "*.jpeg" {
    const _default: string;
    export default _default;
}
