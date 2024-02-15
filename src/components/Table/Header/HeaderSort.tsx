import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { HeaderSortProps } from "types/table";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";

const HeaderSort = ({ column, sort }: HeaderSortProps): JSX.Element => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log("ccc", column["Header"]);
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ display: "inline-flex" }}
    >
      <Box textTransform="capitalize">{column["Header"]}</Box>
      {!column.disableSortBy && (
        <Stack
          sx={{ color: "secondary.light" }}
          {...(sort && {
            ...column.getHeaderProps(column.getSortByToggleProps()),
          })}
        >
          <CaretUpOutlined
            style={{
              fontSize: "0.625rem",
              color:
                column.isSorted && !column.isSortedDesc
                  ? theme.palette.text.secondary
                  : "inherit",
            }}
            onClick={() => {
              if (!isEmpty(column.sortName)) {
                searchParams.set(column.sortName, "asc");
                setSearchParams(searchParams);
                column.isSorted = true;
                column.isSortedDesc = false;
              } else {
                console.error("please set sortName in table");
              }
            }}
          />
          <CaretDownOutlined
            style={{
              fontSize: "0.625rem",
              marginTop: -2,
              color: column.isSortedDesc
                ? theme.palette.text.secondary
                : "inherit",
            }}
            onClick={() => {
              if (!isEmpty(column.sortName)) {
                searchParams.set(column.sortName, "desc");
                setSearchParams(searchParams);
                column.isSortedDesc = true;
                column.isSorted = false;
              } else {
                console.error("please set sortName in table");
              }
            }}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default HeaderSort;
