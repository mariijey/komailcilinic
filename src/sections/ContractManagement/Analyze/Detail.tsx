import { useState, SyntheticEvent } from "react";
import {
  Grid,
  Stack,
  InputLabel,
  Button,
  Tabs,
  Tab,
  Divider,
  TableContainer,
  TableRow,
  Table,
  TableCell,
  TableBody,
} from "@mui/material";
import MainCard from "components/MainCard";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useAnalyzeQuery,
  useUploadCsvAnalyzeMutation,
} from "store/api/contractManagement";
import SingleFileUpload from "components/third-party/dropzone/SingleFile";
import { Controller, useForm } from "react-hook-form";
import { useUploadFileMutation } from "store/api/fileManagement";
import TabPanel from "components/TabPanel";
import AccessGuard from "utils/route-guard/AccessGuard";
import { useDownloadAnalyzeTextMutation } from "store/api/contractManagement";
import useAlert from "hooks/useAlert";

const ContractDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showAlert } = useAlert();
  const { data, isLoading } = useAnalyzeQuery(id);
  const [valueTab, setValueTab] = useState(0);
  const [downloadPdf, { isLoading: loadingDownload }] =
    useDownloadAnalyzeTextMutation();
  const [uploadFile, { isLoading: isLoadingUpload }] = useUploadFileMutation();

  const [updatedDataFn, { isLoading: isLoadingUpdate }] =
    useUploadCsvAnalyzeMutation();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fileId: "",
      files: null,
    },
  });

  const onSubmit = async (formData: any) => {
    await updatedDataFn({ id, data: { fileId: formData.fileId } });
  };

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const handleDownload = () => {
    downloadPdf(id).then((response: any) => {
      if (Boolean(response.data)) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${+new Date()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(link.href);
        showAlert({ message: "Successful download", type: "success" });
      }
    });
  };

  return (
    <MainCard>
      <Tabs
        value={valueTab}
        indicatorColor="primary"
        onChange={handleChangeTab}
        aria-label="product description tabs example"
        variant="scrollable"
      >
        <Tab component={Link} key={"upload"} to="#" label={"Upload"} />
        <Tab component={Link} key={"result"} to="#" label={"Result"} />
      </Tabs>
      <Divider sx={{ mb: 3 }} />
      <TabPanel value={valueTab} index={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="files"
                control={control}
                render={({ field: { name, value } }) => (
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="article">Add your CSV file</InputLabel>
                    <SingleFileUpload
                      file={value}
                      disabled={isLoadingUpload}
                      accept={{ "application/csv": [".csv"] }}
                      maxSize={5000000}
                      loading={isLoading || isLoadingUpload}
                      setFieldValue={(fileName, fileValue) => {
                        setValue(name, fileValue);
                        const formData = new FormData();
                        formData.append("file", fileValue[0]);
                        uploadFile(formData).then(
                          (res: any) =>
                            res &&
                            res.data &&
                            setValue("fileId", res.data.data.id)
                        );
                      }}
                      onRemoveHandler={() => {
                        setValue(name, null);
                      }}
                      error={Boolean(errors?.[name]?.message)}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <AccessGuard access={{ roles: [23, 22] }}>
                <Button
                  disabled={isLoadingUpdate || isLoading}
                  variant="outlined"
                  color="success"
                  type="submit"
                  size="large"
                >
                  Submit
                </Button>
              </AccessGuard>
              <AccessGuard access={{ roles: [23, 22] }}>
                <Button
                  disabled={isLoadingUpdate || isLoading}
                  variant="outlined"
                  color="info"
                  type="submit"
                  size="large"
                  onClick={() =>
                    navigate("/contracts-management/" + data?.data.contractId)
                  }
                  style={{
                    margin: "0px 10px",
                  }}
                >
                  Contract
                </Button>
              </AccessGuard>
              {data?.data.status === "analyzed" && (
                <AccessGuard access={{ roles: [23, 22] }}>
                  <Button
                    variant="outlined"
                    size="large"
                    disabled={loadingDownload}
                    onClick={handleDownload}
                  >
                    Highlighted PDF
                  </Button>
                </AccessGuard>
              )}
            </Grid>
          </Grid>
        </form>
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              {data &&
                data.data &&
                data.data.result &&
                Object.keys(data.data.result).map((item, id: number) => (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.data.result[item]}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </MainCard>
  );
};

export default ContractDetail;
