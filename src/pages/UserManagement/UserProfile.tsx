import { useParams } from "react-router";
import { useRef } from "react";

// material-ui
import { Grid } from "@mui/material";
import { Outlet } from "react-router";
import TabSection from "sections/UserManagement/Detail/TabSection";

type Params = {
  id: string;
};
const UserProfile = () => {
  const { id } = useParams() as Params;
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <TabSection id={id} focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet context={inputRef} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
