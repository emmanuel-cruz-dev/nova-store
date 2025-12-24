import { ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/types";

interface CustomTooltipProps {
  text: string;
  children: ReactElement;
  placement?: Placement;
  delay?: { show: number; hide: number };
}

function CustomTooltip({
  text,
  children,
  placement = "bottom",
  delay = { show: 250, hide: 150 },
}: CustomTooltipProps) {
  return (
    <OverlayTrigger
      placement={placement}
      delay={delay}
      overlay={
        <Tooltip id={`tooltip-${text.replace(/\s+/g, "-")}`}>{text}</Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
}

export default CustomTooltip;
