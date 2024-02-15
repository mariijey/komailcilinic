import { Card, Grid } from "@mui/material";
import { Fragment } from "react";
import { FilterProps } from "types/table";

const Filter = ({ headerGroups }: FilterProps) => {

  return headerGroups.map((group: any, i: number) => (
    <Card
      key={`tbl-filt-group-${i}`}
      variant="outlined"
      sx={{
        padding: "10px",
        margin: "10px 0",
        "& label": {
          fontSize: "12px",
        },
        "& .closeIcon": {
          fontSize: "13px",
          cursor: "pointer",
        },
      }}
    >
      <Grid container spacing={3} padding="10px">
        {group.headers.map((column: any, key: number) => (
          <Fragment key={`tbl-filt-${key}`}>
            {column.filterable ? column.render("Filter") : null}
          </Fragment>
        ))}
      </Grid>
    </Card>
  ));
};

export default Filter;
