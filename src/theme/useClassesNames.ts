/* eslint-disable no-irregular-whitespace */

import { createUseClassNamesFactory } from "tss-react";
import { useTheme } from "@material-ui/core/styles";

export const { createUseClassNames } = createUseClassNamesFactory({ useTheme });
