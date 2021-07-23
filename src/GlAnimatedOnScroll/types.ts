import type {
    AnimationControls,
    TargetAndTransition,
    VariantLabels,
} from "framer-motion";
import type { MakeCustomValueType } from "framer-motion/types/types";
import type { SVGAttributes, CSSProperties } from "react";

interface CustomStyles {
    size?: string | number;
    radius?: string | number;
    shadow?: string;
    image?: string;
}

interface SVGPathProperties {
    pathLength?: number;
    pathOffset?: number;
    pathSpacing?: number;
}

interface TransformProperties {
    x?: string | number;
    y?: string | number;
    z?: string | number;
    translateX?: string | number;
    translateY?: string | number;
    translateZ?: string | number;
    rotate?: string | number;
    rotateX?: string | number;
    rotateY?: string | number;
    rotateZ?: string | number;
    scale?: string | number;
    scaleX?: string | number;
    scaleY?: string | number;
    scaleZ?: string | number;
    skew?: string | number;
    skewX?: string | number;
    skewY?: string | number;
    originX?: string | number;
    originY?: string | number;
    originZ?: string | number;
    perspective?: string | number;
    transformPerspective?: string | number;
}

type CSSPropertiesWithoutTransitionOrSingleTransforms = Omit<
    CSSProperties,
    "transition" | "rotate" | "scale" | "perspective"
>;

type TargetProperties = CSSPropertiesWithoutTransitionOrSingleTransforms &
    SVGAttributes<SVGElement> &
    TransformProperties &
    CustomStyles &
    SVGPathProperties;

export type Animation =
    | boolean
    | AnimationControls
    | TargetAndTransition
    | VariantLabels
    | undefined;

export type Initial =
    | boolean
    | MakeCustomValueType<TargetProperties>
    | VariantLabels
    | undefined;
