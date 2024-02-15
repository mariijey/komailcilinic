import { Checkbox, Chip } from "@mui/material";
import { forwardRef, useRef } from "react";

export const TableRowSelection = ({ selected }: { selected: number }) => {
  return (
    <>
      {selected > 0 ? (
        <Chip
          size="small"
          label={"Row Selected"}
          // label={t("table.row_selected", { count: selected })}
          color="secondary"
          variant="light"
          sx={{
            position: "absolute",
            right: -1,
            top: -1,
            borderRadius: "0 4px 0 4px",
            width: "100%",
            justifyContent: "flex-end",
          }}
        />
      ) : (
        <Chip
          size="small"
          label={"No Selected Row"}
          color="secondary"
          variant="light"
          sx={{
            position: "absolute",
            right: -1,
            top: -1,
            borderRadius: "0 4px 0 4px",
            width: "100%",
            justifyContent: "flex-end",
          }}
        />
      )}
    </>
  );
};

export const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }: { indeterminate: any }, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    return (
      <Checkbox indeterminate={indeterminate} ref={resolvedRef} {...rest} />
    );
  }
);
