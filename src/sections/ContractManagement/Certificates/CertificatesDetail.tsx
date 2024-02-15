import React, { useState } from "react";
import {
  useContractQuery,
  useRejectDepositCertificateMutation,
  useCompleteContractMutation,
} from "store/api/contractManagement";
import {  useParams } from "react-router-dom";
import MainCard from "components/MainCard";
import {
  Button,
  OutlinedInput,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const CertificatesDetail = () => {
  const { id } = useParams();
  const [depositAdminMessage, setDepositAdminMessage] = useState<string>("");
  const { data } = useContractQuery(id);
  const navigate = useNavigate();
  const [rejectApi, { isLoading: rejectLoading }] =
    useRejectDepositCertificateMutation();
  const [completeContract, { isLoading: acceptLoading }] =
    useCompleteContractMutation();

  const handleReject = () => {
    rejectApi({ id, data: { depositAdminMessage } }).then((res: any) => {
      if (res.data.status) {
        navigate("/certificates-deposit");
      }
    });
  };

  const handleAccept = () => {
    completeContract(id).then((res: any) => {
      if (res.data.status) {
        navigate("/certificates-deposit");
      }
    });
  };

  return (
    <MainCard>
      {/* <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "30%",
          },
        }}
      >
        <DialogTitle>Whay do you Reject?</DialogTitle>
        <DialogContent>
          <OutlinedInput
            type="text"
            rows={4}
            multiline
            value={depositAdminMessage}
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setDepositAdminMessage(e.target.value)}
          />
          <LoadingButton
            variant="outlined"
            color="primary"
            onClick={handleReject}
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </DialogContent>
      </Dialog> */}

      <Typography variant="subtitle2" color="secondary" component="span">
        Whay do you want Reject?
      </Typography>
      <OutlinedInput
        type="text"
        rows={4}
        multiline
        value={depositAdminMessage}
        style={{ width: "100%", marginBottom: "10px" }}
        onChange={(e) => setDepositAdminMessage(e.target.value)}
      />
      <Box display={"flex"}>
        <LoadingButton
          variant="outlined"
          color="error"
          onClick={handleReject}
          loading={rejectLoading}
        >
          Reject
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="primary"
          style={{
            margin: "0px 10px",
          }}
          loading={acceptLoading}
          onClick={handleAccept}
        >
          Accept
        </LoadingButton>
        {data ? (
          <a
            href={data?.data?.depositCertificateFile?.downloadUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="contained" color="primary">
              Get to file
            </Button>
          </a>
        ) : (
          <Skeleton
            width={100}
            style={{
              WebkitTransform: "none",
            }}
          />
        )}
      </Box>
    </MainCard>
  );
};

export default CertificatesDetail;
