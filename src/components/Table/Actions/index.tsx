import React, { useState } from "react";
import { ActionProps } from "types/table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popover,
  TableCell,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccessGuard from "utils/route-guard/AccessGuard";

const Actions = ({ actionList, row }: ActionProps): JSX.Element => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell colSpan={1} key="header_actions" role="columnheader" width="20">
      <Button
        onClick={handleClick}
        size="small"
        aria-controls={open ? "split-button-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
      >
        <MoreVertIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList id="split-button-menu" autoFocusItem>
            {actionList &&
              actionList.map((option) => (
                <AccessGuard access={option.access} key={option.id}>
                  <MenuItem
                    disabled={option.isDisable?.(row)}
                    onClick={() => {
                      setAnchorEl(null);
                      if (option.hasLink && option.hasBlank) {
                        window.open(
                          option?.navigateLink?.(row.original.id),
                          "_blank"
                        );
                      } else if (option.hasLink)
                        navigate(option?.navigateLink?.(row.original.id));
                      else return option.handleClick?.(row.original);
                      handleClose();
                    }}
                  >
                    {option.title}
                  </MenuItem>
                </AccessGuard>
              ))}
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </TableCell>
  );
};

export default Actions;
