import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { outlineStyles } from "utils";

export const StyledRoot = styled("div")({
  marginTop: theme.spacing("xs"),
  backgroundColor: theme.colors.atmo1,
  borderBottom: theme.calendar.headerInputBorderBottom,
  borderTop: theme.calendar.headerInputBorderTop,
  borderLeft: theme.calendar.headerInputBorderLeft,
  borderRight: theme.calendar.headerInputBorderRight,
  borderRadius: theme.calendar.borderRadius,
  "&:hover, &:focus": {
    borderBottom: `1px solid ${theme.colors.acce1}`,
  },
});

export const StyledInputBorderContainer = styled("div")({
  backgroundColor: theme.colors.sema4,
  height: 1,
  marginTop: -1,
});

export const StyledInput = styled((props) => <input {...props} />)({
  border: "none",
  backgroundColor: "transparent",
  padding: `5px ${theme.spacing("xs")}`,
  fontFamily: theme.fontFamily.body,

  color: theme.calendar.headerInputFontColor,
  fontSize: theme.calendar.headerInputFontSize,
  letterSpacing: theme.calendar.headerInputFontLetterSpacing,
  lineHeight: theme.calendar.headerInputFontLineHeight,
  fontWeight: theme.calendar.headerInputFontWeight,
  width: "100%",
  "&::placeholder": {
    color: theme.colors.atmo5,
  },
  "&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator": {
    " -webkit-appearance": "none",
    display: "none",
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    ...outlineStyles,
  },
});

export const StyledHeaderDayOfWeek = styled(HvTypography)({
  color: theme.calendar.headerInputFontColor,
  paddingLeft: theme.spacing("xs"),
});