import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CustomTooltipProps } from "../../types";

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
