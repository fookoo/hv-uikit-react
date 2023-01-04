import clsx from "clsx";
import { HvBaseProps } from "types";
import { HvAtmosphereColorKeys, HvSemanticColorKeys } from "types/hv";
import {
  StyledRoot,
  StyledContainer,
  StyledBar,
  StyledIcon,
} from "./Card.styles";

export type CardProps = HvBaseProps<HTMLDivElement> & {
  /** The renderable content inside the icon slot of the header. */
  icon?: React.ReactNode;
  /** Whether the card is selectable. */
  selectable?: boolean;
  /** Whether the card is currently selected. */
  selected?: boolean;
  /** The background color of the card. */
  bgColor?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
  /**
   *  The border color at the top of the card. Must be one of palette semantic or atmosphere colors.
   *  To set another color, the borderTop should be override.
   */
  statusColor?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    selectable?: string;
    selected?: string;
    semanticBar?: string;
  };
};

/**
 * A card is a container for a few short and related pieces of content.
 * It roughly resembles a playing card in size and shape and is intended as a
 * linked short representation of a conceptual unit. For that reason,
 * this pattern must be used as an entry-point for further information.
 */
export const Card = ({
  classes,
  className,
  children,
  icon,
  selectable = false,
  selected = false,
  statusColor = "sema0",
  bgColor = "atmo1",
  ...others
}: CardProps) => {
  return (
    <StyledRoot
      aria-selected={selectable ? selected : undefined}
      className={clsx(
        "HvIsCardGridElement",
        classes?.root,
        className,
        selectable && classes?.selectable,
        selected && classes?.selected
      )}
      $selectable={selectable}
      $selected={selected}
      {...others}
    >
      <StyledContainer bgColor={bgColor}>
        <StyledBar className={classes?.semanticBar} barColor={statusColor} />
        <StyledIcon>{icon}</StyledIcon>
        {children}
      </StyledContainer>
    </StyledRoot>
  );
};