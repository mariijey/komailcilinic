import { TableCell, TableHead, TableRow } from "@mui/material";
import { HeaderProps } from "types/table";
import HeaderSort from "./HeaderSort";

const Header = ({
  headerGroups,
  columnAlign = "center",
  hasAction = true,
}: HeaderProps): JSX.Element => {
  return (
    <TableHead sx={{ borderTopWidth: 2 }}>
      {headerGroups &&
        headerGroups.map((headerGroup, key: number) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, cellKey: number) => (
              <TableCell
                key={cellKey}
                align={columnAlign}
                {...column.getHeaderProps([{ className: column.className }])}
              >
                <HeaderSort column={column} />
                {/* {column.render('Header')} */}
              </TableCell>
            ))}
            {hasAction && (
              <TableCell align={columnAlign} width={5}>
                Actions
              </TableCell>
            )}
          </TableRow>
        ))}
    </TableHead>
  );
};

export default Header;
