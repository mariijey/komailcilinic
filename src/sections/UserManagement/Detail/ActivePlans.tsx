import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  Zoom,
  styled,
  tooltipClasses,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/material";
import MainCard from "components/MainCard";
import { Params, useParams } from "react-router";
import { useGetUserQuery } from "store/api/userManagement";
import { setCurrency } from "utils/helpers/main";
import noPlan from "assets/images/users/empty-folder.png";
import { Masonry } from "@mui/lab";

type Props = {};

type ActivePlanStatusType = "active" | "deactivate" | "will_expire";
const ActivePlanEnum = {
  ACTIVE: "active",
  DE_ACTIVE: "deactivate",
  WILL_EXPIRED: "will_expire",
};

const ActivePlans = (props: Props) => {
  const theme = useTheme();
  const params = useParams() as Params;
  const id: string = params.id as string;

  const { data, isLoading } = useGetUserQuery(id);

  const calculateDaysBetweenDates = (startDate: Date, endDate: Date) => {
    // Convert the dates to UTC to avoid timezone-related issues
    const startUtc = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const endUtc = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    // Calculate the number of milliseconds between the two dates
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.floor(
      Math.abs(endUtc - startUtc) / millisecondsPerDay
    );

    return daysDifference;
  };

  const createCard = (
    plan: {
      isExpired: boolean;
      status: ActivePlanStatusType;
      plan: any;
      endedAt: string;
    },
    key: number
  ) => {
    const config = {
      color: theme.palette.primary.main,
      textExpired: "",
    };

    const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: config.color,
        "& span": { color: config.color },
        // color: 'rgba(0, 0, 0, 0.87)',
        // maxWidth: 220,
        // fontSize: theme.typography.pxToRem(12),
        // border: '1px solid #dadde9',
      },
    }));

    switch (plan.status) {
      case ActivePlanEnum.WILL_EXPIRED: {
        config.color = theme.palette.warning.main;
        config.textExpired = `Will expired in ${calculateDaysBetweenDates(
          new Date(),
          new Date(plan.endedAt)
        )} days`;
        break;
      }
      case ActivePlanEnum.DE_ACTIVE: {
        config.color = theme.palette.error.main;
        break;
      }
      case ActivePlanEnum.ACTIVE:
      default: {
        config.color = theme.palette.success.main;
        break;
      }
    }

    return (
      <CustomTooltip
        title={config.textExpired}
        placement="left"
        arrow
        TransitionComponent={Zoom}
      >
        <Card
          key={key}
          sx={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "16px",
            transition: "300ms ease",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
              "& .MuiBox-root": {
                border: `1px ${config.color} solid`,
              },
            },
          }}
        >
          <Box
            sx={{
              p: 1,
              border: `1px transparent solid`,
              borderRadius: "16px",
            }}
          >
            <Typography gutterBottom variant="h3" component="h2" sx={{ py: 1 }}>
              {plan.plan.title}
            </Typography>
            <Stack direction="row" spacing={1.25} alignItems="flex-end">
              <Typography
                variant="h3"
                component="h3"
                sx={{ py: 1, color: config.color }}
              >
                {plan.plan.price + setCurrency(plan.plan.currency)}
              </Typography>
              <Typography
                variant="h6"
                sx={{ py: 1, fontWeight: "bold" }}
                color="secondary"
              >
                {`/ ${plan.plan.description}`}
              </Typography>
            </Stack>
            <Divider
              sx={{
                mb: 2,
                borderWidth: "1px",
                borderColor: theme.palette.secondary.light,
              }}
            />
            {plan.plan.options.map((option: string, key: number) => (
              <Stack direction="row" key={key} spacing={1.25} sx={{ py: 1 }}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color={config.color}
                  fontSize="1rem"
                />

                <Typography component="span" sx={{ fontSize: "0.8rem" }}>
                  {option}
                </Typography>
              </Stack>
            ))}
            <Divider
              sx={{
                mb: 2,
                borderWidth: "1px",
                borderColor: theme.palette.secondary.light,
              }}
            />
            <Stack direction="row" spacing={1.25} alignItems="flex-end">
              <Chip
                variant="light"
                sx={{
                  width: "100%",
                  py: 1,
                  color: config.color,
                  border: "1px dashed",
                  borderColor: config.color,
                }}
                label={plan.status}
              />
            </Stack>
          </Box>
        </Card>
      </CustomTooltip>
    );
  };

  return (
    <MainCard content={false} title={"Active Plans"} sx={{ mb: 1 }}>
      <Box sx={{ p: 2.5 }}>
        {isLoading ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Skeleton sx={{ minHeight: "300px" }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Skeleton sx={{ minHeight: "300px" }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Skeleton sx={{ minHeight: "300px" }} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {data?.data?.activePlans && data?.data?.activePlans?.length > 0 ? (
              <Grid item xs={12}>
                <Masonry columns={{ xs: 6, sm: 3 }} spacing={1.5}>
                  {data.data.activePlans.map((plan: any, key: number) =>
                    createCard(plan, key)
                  )}
                </Masonry>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={noPlan}
                  alt="empty plan"
                  sx={{ width: 70 }}
                />
                <Typography variant="body1" color={theme.palette.primary.main}>
                  No plans
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </MainCard>
  );
};

export default ActivePlans;
