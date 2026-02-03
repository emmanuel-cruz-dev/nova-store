import { useEffect, useRef } from "react";
import { CheckboxState } from "../../types";

export function useIndeterminateCheckbox(checkboxState: CheckboxState) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = checkboxState === "indeterminate";
    }
  }, [checkboxState]);

  return checkboxRef;
}
