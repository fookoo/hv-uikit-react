import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvWizardActions", {
  actionsContainer: {},
  buttonWidth: {
    width: 120,
    "& span": {
      whiteSpace: "normal",
      lineHeight: theme.lineHeights.sm,
    },
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  },
  buttonSpacing: {},
});
