import type { ReactNode } from "react";

export type Props = {
    children: ReactNode;
};

export const GlCard = (props: Props) => {
    const { children } = props;

    return <div>{children}</div>;
};
