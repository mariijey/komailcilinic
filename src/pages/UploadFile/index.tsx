/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, InputLabel } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Card, Grid, Stack } from "@mui/material";
import SingleFileUpload from "components/third-party/dropzone/SingleFile";
import { isEmpty } from "lodash";
import { useUploadFileMutation } from "store/api/fileManagement";
import { CustomFile } from "types/dropzone";
import FileCopyIcon from "@mui/icons-material/FileCopy";

type Props = {};

const UploadFile = (props: Props) => {
  const [file, setFile] = useState<{ value: CustomFile[]; url: string } | null>(
    null
  );
  const [copied, setCopied] = useState<boolean>(false);

  const [uploadFile, { data, isLoading, isError, isSuccess }] =
    useUploadFileMutation();

  useEffect(() => {
    if (isSuccess && file)
      data && setFile({ ...file, url: data.data.downloadUrl });
    else if (isError) setFile(null);
  }, [data, isError, isSuccess]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid xs={12} md={6} item>
        <form>
          <Card variant="outlined" sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} item>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="article">Image</InputLabel>
                  <SingleFileUpload
                    file={file && file?.value}
                    disabled={isLoading}
                    maxSize={5000000}
                    loading={isLoading}
                    setFieldValue={(fileName, fileValue) => {
                      setFile({ value: fileValue, url: "" });
                      const formData = new FormData();
                      formData.append("file", fileValue[0]);
                      formData.append("isTemp", "0");
                      uploadFile(formData);
                    }}
                    onRemoveHandler={() => setFile(null)}
                  />
                </Stack>
              </Grid>
              {file && !isEmpty(file.url) && (
                <Grid xs={12}>
                  <Stack direction="row">
                    <Box
                      sx={{
                        mt: 2,
                        border: "1px solid #ccc",
                        padding: "16px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="caption">{file.url}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={() => copyToClipboard(file.url)}
                        endIcon={<FileCopyIcon />}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </Box>
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};

export default UploadFile;
