import React, { Fragment } from "react";
import { Contract } from "types/contractManagment";
import { Typography, Alert, Stack, AlertTitle } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";

const PropertyCerificate = ({ data }: { data?: Contract }) => {
  return (
    <Stack mt={2}>
      {data?.certificates?.length ? (
        <Fragment>
          {data?.certificates?.map((value) => (
            <ListItem disableGutters>
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
              <a href={value.file.downloadUrl} target="_blank" rel="noreferrer">
                <Typography color={"gray"}>Get to file</Typography>
              </a>
            </ListItem>
          ))}
        </Fragment>
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
         Not data
        </Alert>
      )}
    </Stack>
  );
};

export default PropertyCerificate;
