import React, { useRef, useState } from "react";
import {
  formatsListNormalizer,
  validateFileSize,
  validateFileType,
} from "utils/helpers/main";
import { Avatar, Box, Button, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/reducers/snackbar";
import { PlusOutlined } from "@ant-design/icons";
import { IMG_AVATAR_SIZE, IMG_AVATAR_TYPES } from "config";

type AvatarProps = {
  img?: any;
  loading?: boolean;
  validTypes?: string[] | undefined;
  fileSize?: number;
  setUploadedImage?: ((file: any) => void) | undefined;
  placeholder?: any;
};
const AvatarImageUploader = (props: AvatarProps) => {
  const {
    img = "",
    validTypes = IMG_AVATAR_TYPES,
    fileSize = IMG_AVATAR_SIZE,
    loading = false,
    placeholder = "",
    setUploadedImage,
  } = props;
  const dispatch = useDispatch();

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const inputRef = useRef<any>();

  const validationHandler = (file: { size: number }) => {
    let isValid = false;
    if (file) {
      if (!validateFileType(file, validTypes)) {
        dispatch(
          openSnackbar({
            open: true,
            message: "File Format Error",
            variant: "alert",
            alert: {
              color: "error",
            },
          })
        );
        return false;
      }
      if (!validateFileSize(file, fileSize)) {
        dispatch(
          openSnackbar({
            open: true,
            message: "File Format Error",
            variant: "alert",
            alert: {
              color: "error",
            },
          })
        );
        return false;
      }
      isValid = true;
    }
    return isValid;
  };

  const handleUploadImage = (e: any) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    if (file) {
      if (file.size && file.size > 0) {
        const isValidate = validationHandler(file);
        if (isValidate) {
          reader.onloadend = () => {
            if (reader?.result) {
              // @ts-ignore
              setImagePreviewUrl(reader.result);
            }
          };
          reader.readAsDataURL(file);
          if (setUploadedImage) {
            setUploadedImage(file);
          }
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {imagePreviewUrl ? (
        <Avatar src={imagePreviewUrl} sx={{ height: "64px", width: "64px" }} />
      ) : !loading && img ? (
        <Avatar
          src={img || placeholder}
          sx={{ height: "64px", width: "64px" }}
        />
      ) : (
        <Skeleton variant={"circular"} width={64} height={64} />
      )}
      {setUploadedImage ? (
        <>
          <input
            accept={`${formatsListNormalizer(validTypes, ",", true)}`}
            id="contained-button-file"
            multiple={false}
            type="file"
            onChange={handleUploadImage}
            hidden
            ref={inputRef}
          />
          <label htmlFor="contained-button-file">
            <Button
              type={"button"}
              disableTouchRipple
              variant={"text"}
              onClick={() => inputRef.current.click()}
            >
              <PlusOutlined />{" "}
              <Box component={"span"} ml={0.3}>
                Add Image
              </Box>
            </Button>
          </label>
        </>
      ) : null}
    </Box>
  );
};

export default AvatarImageUploader;
