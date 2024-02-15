import React, { Fragment } from "react";
import { Contract } from "types/contractManagment";
import { Stack, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";

const Images = ({ data }: { data?: Contract }) => {

  return (
    <Stack mt={2}>
      {data?.images?.length && (
        <Fragment>
          <Typography variant="h4">Images</Typography>
          <ImageList cols={3} gap={8}>
            <Fragment>
              {data?.images?.map((item) => (
                <Stack>
                  <ImageListItem key={item.id}>
                    <a
                      href={item?.file?.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={item?.file?.downloadUrl}
                        srcSet={item?.file?.downloadUrl}
                        alt={"image" + item?.id}
                        loading="lazy"
                        style={{ height: 250 }}
                      />
                    </a>
                  </ImageListItem>
                  <ImageListItemBar
                    title={item.description}
                    // subtitle={<span>by: {item.author}</span>}
                    position="below"
                  />
                </Stack>
              ))}
            </Fragment>
          </ImageList>
        </Fragment>
      )}
      {data?.defects?.length && (
        <Fragment>
          <Typography variant="h4">Defects</Typography>
          {data?.defects?.map((value) => (
            <ListItem key={value} disableGutters>
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
              <ListItemText primary={value} />
            </ListItem>
          ))}
        </Fragment>
      )}
    </Stack>
  );
};

export default Images;
