import { Fragment, useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Skeleton,
  OutlinedInput,
  Grid,
  InputLabel,
  Button,
} from "@mui/material";
import MainCard from "components/MainCard";
import {
  useContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "store/api/contactUsManagement";
import { useParams, useNavigate } from "react-router-dom";

const ContactUsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, isLoading } = useContactQuery(id);
  const [updateRequest, { isLoading: isLoadingUpdate }] =
    useUpdateContactMutation();
  const [deleteRequest, { isLoading: isLoadingDelete }] =
    useDeleteContactMutation();

  const [reviewMessage, setReviewMessage] = useState<string | undefined>(
    data?.data.reviewMessage
  );

  useEffect(() => {
    setReviewMessage(data?.data.reviewMessage ?? "");
  }, [data]);

  const Item = ({
    value,
    label,
  }: {
    value?: string | number;
    label: string;
  }) => {
    return (
      <Stack
        direction="row"
        style={{ display: "flex", alignItems: "center" }}
        spacing={0.5}
        my={1}
      >
        <Typography variant="h6">{label}:</Typography>
        {isFetching || isLoading ? (
          <Skeleton width={100} height={20} />
        ) : (
          <Typography variant="h6">{value}</Typography>
        )}
      </Stack>
    );
  };

  const handleForm = () => {
    updateRequest({ id, reviewMessage });
  };

  const handleDelete = () => {
    deleteRequest({ id }).then(() => {
      navigate("/contactus-management");
    });
  };

  return (
    <Fragment>
      <MainCard>
        <Item value={data?.data.name} label={"Name"} />
        <Item value={data?.data.email} label={"Email"} />
        <Item value={data?.data.topic} label={"Topic"} />
        <Item value={data?.data.message} label={"Message"} />
        {!isFetching && (
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <InputLabel>Review Message</InputLabel>
            <OutlinedInput
              type="text"
              rows={4}
              multiline
              value={reviewMessage}
              style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleForm}
              disabled={isLoadingUpdate}
            >
              {"Submit"}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDelete}
              disabled={isLoadingDelete}
              style={{ marginLeft: "10px" }}
            >
              {"Delete"}
            </Button>
          </Grid>
        )}
      </MainCard>
    </Fragment>
  );
};

export default ContactUsDetail;
