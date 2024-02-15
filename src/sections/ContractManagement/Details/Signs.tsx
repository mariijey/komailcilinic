import React, { Fragment } from "react";
import { Contract } from "types/contractManagment";
import { Stack } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Signs = ({ data }: { data?: Contract }) => {
  return (
    <Stack mt={2}>
      <Fragment>
        <ImageList cols={3} gap={8}>
          <Fragment>
            {data?.signs?.map((item) => (
              <Stack>
                <ImageListItem key={item.id}>
                  <img
                    src={item?.file?.downloadUrl}
                    srcSet={item?.file?.downloadUrl}
                    alt={"image" + item?.id}
                    loading="lazy"
                    style={{ height: 250 , objectFit:'none'}}
                  />
                </ImageListItem>
                <ImageListItemBar
                  title={item?.type}
                  // subtitle={<span>by: {item.author}</span>}
                  position="below"
                />
              </Stack>
            ))}
          </Fragment>
        </ImageList>
      </Fragment>
    </Stack>
  );
};

export default Signs;
