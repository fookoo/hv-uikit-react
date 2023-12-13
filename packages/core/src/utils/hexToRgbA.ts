import { hexToRgb, alpha } from "@mui/material";

// TODO - remove in v6 in favor of theme.alpha()
export const hexToRgbA = (hex, factor = 0.8) => alpha(hexToRgb(hex), factor);
