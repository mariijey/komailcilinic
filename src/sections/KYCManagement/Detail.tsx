import { Fragment } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import MainCard from "components/MainCard";
import { useKYCQuery, useUpdateKycMutation } from "store/api/KYCManagement";
import { Link, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const KYCDetail = () => {
  const { id } = useParams();
  const { data } = useKYCQuery(id);
  const navigate = useNavigate();
  const [update, { isLoading }] = useUpdateKycMutation();

  const updateKyc = () => {
    const updated = {
      id,
      status: "active",
      realName: data?.data?.realName,
      realPhone: data?.data?.realPhone,
      realAddress: data?.data?.realAddress,
      verifiedAt: data?.data?.verifiedAt,
      declineReason: data?.data?.declineReason,
    };
    update(updated).then((res: any) => {
      if (Boolean(res?.data?.status)) {
        navigate("/kyc-management");
      }
    });
  };

  return (
    <Fragment>
      <MainCard title={"KYC Information"}>
        <Link
          to={data?.data?.user?.avatar?.downloadUrl || "default-profile.jpg"}
          target="_blank"
        >
          <Avatar
            alt={data?.data?.user?.email}
            src={data?.data?.user?.avatar?.downloadUrl || "default-profile.jpg"}
            style={{
              width: 100,
              height: 100,
              border: "1px dashed",
            }}
          />
        </Link>

        <Items label={"Name"} value={data?.data?.realName} />
        <Items label={"Phone"} value={data?.data?.realPhone} />
        <Items label={"Address"} value={data?.data?.realAddress} />
        <Items label={"Decline Reason"} value={data?.data?.declineReason} />
        <Items label={"Status"} value={data?.data?.status} />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={updateKyc}
        >
          Verify
        </LoadingButton>
      </MainCard>
    </Fragment>
  );
};

export default KYCDetail;

const Items = ({ label, value }: { label: string; value?: string | null }) => {
  return (
    <Box pt="20px" display={"flex"} alignItems={"center"}>
      <Typography fontSize={"15px"}>{label}:</Typography>
      <Typography
        pl={"3px"}
        pt={"3px"}
        textTransform={"capitalize"}
        color={"gray"}
      >
        {value?.split("_").join(" ")}
      </Typography>
    </Box>
  );
};
