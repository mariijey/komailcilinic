import React from "react";
import { Stack, Typography } from "@mui/material";
import MainCard from "components/MainCard";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

interface Item {
  index: number;
  label: string;
}

const StepStatus = ({ status }: { status?: string }) => {
  const STATUS_STEPS: Record<string, Item> = {
    in_progress: { label: "In progress", index: 0 },
    pending_deposit: { label: "Pending for deposit", index: 1 },
    pending_certificate_confirmation: {
      label: "Pending Certificate Confirmation",
      index: 2,
    },
    completed: { label: "Completed", index: 3 },
    archived: {
      label: "Archived",
      index: 4,
    },
  };
  return (
    <Stack mt={2}>
      {status && (
        <MainCard>
          <Typography variant="h5" mb={2} color={"gray"}>
            Contract Status
          </Typography>
          <Stepper activeStep={STATUS_STEPS[status].index} alternativeLabel>
            {Object.values(STATUS_STEPS).map((item) => (
              <Step key={item.index}>
                <StepLabel>{item.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </MainCard>
      )}
    </Stack>
  );
};

export default StepStatus;
