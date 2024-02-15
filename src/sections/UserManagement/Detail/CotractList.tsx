import React, { useEffect } from "react";
import { useParams } from "react-router";
import MainCard from "components/MainCard";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useLazyContractListQuery } from "store/api/contractManagement";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { getPrice } from "utils/helpers/main";
import { useNavigate } from "react-router";

const CotractList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getList, { data, isLoading }] = useLazyContractListQuery();

  useEffect(() => {
    if (id) getList({ userId: id });
  }, [id]);

  console.log("ccc", data);

  return (
    <MainCard title="Contract List">
      <Grid container spacing={2}>
        {data?.data?.items.map((contract: any) => (
          <Grid item xs={4}>
            <MainCard>
              <User data={contract} />

              <Box display={"flex"} justifyContent={"space-between"} my={2}>
                <Box display={"flex"}>
                  <Typography fontSize={13}>Deposit:</Typography>
                  <Typography ml={1} fontSize={13}>
                    {getPrice(contract?.deposit) || "Nan"}
                  </Typography>
                </Box>
                <Box display={"flex"}>
                  <Typography fontSize={13}>Monthly Rent:</Typography>
                  <Typography ml={1} fontSize={13}>
                    {getPrice(contract?.monthlyRent) || "Nan"}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                onClick={() => navigate("/contracts-management/" + contract.id)}
              >
                See More
              </Button>
            </MainCard>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default CotractList;

const User = ({ data }: { data: any }) => {
  const profileIcon =
    "https://www.pngitem.com/pimgs/m/517-5177724_vector-transparent-stock-icon-svg-profile-user-profile.png";

  const contractStatus: Record<string, string> = {
    in_progress: "in progress",
    pending_deposit: "pending deposit",
    completed: "completed",
    require_settlement: "Request deposit required",
    request_settlement: "Deposit requested",
    accept_settlement: "Return deposit accepted",
    archived: "Deposit returned",
    canceled: "canceled",
  };
  const contractColor: Record<
    string,
    "success" | "primary" | "warning" | "error"
  > = {
    in_progress: "warning",
    pending_deposit: "warning",
    completed: "success",
    require_settlement: "primary",
    request_settlement: "primary",
    accept_settlement: "success",
    archived: "primary",
    canceled: "error",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Chip
          label={contractStatus[data.status]}
          color={contractColor[data.status]}
          variant="outlined"
          style={{
            borderRadius: "50px",
          }}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={data?.landlord?.email || ""}
            src={data?.landlord?.avatar?.downloadUrl || profileIcon}
            style={{
              border: "1px solid #e6ebf1",
              borderRadius: "100%",
            }}
          />
          <Typography ml={1} color={"gray"} fontSize={12}>
            Landlord
          </Typography>
        </div>
        <Typography color={"gray"}>{data?.landlord?.email}</Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <Avatar
            alt={data?.tenant?.email || ""}
            src={data?.tenant?.avatar?.downloadUrl || profileIcon}
            style={{
              border: "1px solid #e6ebf1",
              borderRadius: "100%",
            }}
          />
          <Typography ml={1} color={"gray"} fontSize={12}>
            Tenant
          </Typography>
        </div>
        <Typography color={"gray"}>{data?.tenant?.email}</Typography>

        {data?.agent && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <Avatar
                alt={data?.agent?.email || ""}
                src={data?.agent?.avatar?.downloadUrl || profileIcon}
                style={{
                  border: "1px solid #e6ebf1",
                  borderRadius: "100%",
                }}
              />
              <Typography ml={1} color={"gray"} fontSize={12}>
                Agent
              </Typography>
            </div>
            <Typography color={"gray"}>{data?.agent?.email}</Typography>
          </>
        )}
      </div>
    </>
  );
};
