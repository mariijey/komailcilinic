import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {};

const BreadCrumb = (props: Props) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      separator="/"
      aria-label="breadcrumb"
      sx={{
        mb: 4,
        color: "#8c8c8c",
        "& a": {
          color: "#8c8c8c",
        },
      }}
    >
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const showName = name.charAt(0).toUpperCase() + name.slice(1);
        return isLast ? (
          <Typography key={name} color="textPrimary">
            {showName.replace(/-/g, " ")}
          </Typography>
        ) : (
          <Link key={name} to={routeTo}>
            {showName.replace(/-/g, " ")}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
