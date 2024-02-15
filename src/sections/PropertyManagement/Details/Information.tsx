import {
  Button,
  Divider,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { PropertyEnum } from "types/property";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faFlag,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import ChangeStatusDialog from "../ChangeStatusDialog";
import { useNavigate } from "react-router";
import AccessGuard from "utils/route-guard/AccessGuard";
import { Link } from "react-router-dom";

const Information = ({
  property,
  isLoading,
}: {
  property: any;
  isLoading: boolean;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setChipColor = () => {
    switch (property.status) {
      case PropertyEnum.rented:
        return "success";
      case PropertyEnum.listed:
        return "info";
      case PropertyEnum.pending:
        return "primary";
      case PropertyEnum.pending_payment:
        return "warning";
      case PropertyEnum.canceled:
        return "error";
      case PropertyEnum.draft:
      default:
        return "secondary";
    }
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1.25}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Typography variant="h3">{property?.name}</Typography>
        )}
      </Stack>
      <Divider />
      <Stack spacing={1.25} flexDirection="row" alignItems="baseline">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <AccessGuard access={{ roles: [11] }}>
              <Button
                variant="contained"
                color={setChipColor()}
                onClick={() => setIsOpen(true)}
                endIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                sx={{
                  fontSize: "1rem",
                  borderRadius: "4px",
                }}
              >
                {String(property.status).toLocaleUpperCase()}
              </Button>
            </AccessGuard>
            <Button
              variant="dashed"
              color="primary"
              endIcon={<FontAwesomeIcon icon={faRectangleList} />}
              onClick={() =>
                navigate(
                  `/property-management/${property.id}/received-request-list`
                )
              }
              sx={{
                mx: "8px !important",
                my: "0 !important",
                fontSize: "1rem",
                borderRadius: "4px",
              }}
            >
              Received Requests
            </Button>
            <Button
              variant="dashed"
              color="primary"
              onClick={() =>
                navigate(`/property-management/${property.id}/reports`)
              }
              endIcon={<FontAwesomeIcon icon={faFlag} />}
              sx={{
                mx: "8px !important",
                my: "0 !important",
                fontSize: "1rem",
                borderRadius: "4px",
              }}
            >
              Reports
            </Button>
          </>
        )}
      </Stack>
      <Divider />
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">{"CreatedBy"}:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography
            component="a"
            variant="h6"
            target="_blank"
            href={`/user-management/${property?.user?.id}/personal`}
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            {property?.user?.name}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">BedNumber:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography variant="h6">{property.bedNumber}</Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">BathroomNumber:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography variant="h6">{property.bathroomNumber}</Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">Deposit:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography variant="h6">
            {`${Number(property.deposit).toLocaleString("En")} ${
              property.currency
            }`}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">MonthlyRent:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography variant="h6">
            {`${Number(property.monthlyRent).toLocaleString("En")} ${
              property.currency
            }`}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">Build Year:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography variant="h6">
            {new Date(property.buildDate).getFullYear()}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">MaxAllowedTenants:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography variant="h6">{property.maxAllowedTenants}</Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Typography variant="h6">Furnishing:</Typography>
        {isLoading ? (
          <Skeleton sx={{ minWidth: "100px" }} />
        ) : (
          <Typography variant="h6">{property.furnishing}</Typography>
        )}
      </Stack>
      <ChangeStatusDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedId={property.id}
        defaultValue={property.status}
      />
    </Stack>
  );
};

export default Information;
