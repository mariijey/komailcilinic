import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faMapLocationDot,
  faMoneyBillTrendUp,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import { Button, Dialog } from "@mui/material";
import ReactTable from "components/Table";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBaseDataQuery } from "store/api/common";
import { useLazySaveSearchesQuery } from "store/api/userManagement";
import { SortEnum } from "types/config";

type Props = {
  userId?: string | number;
};

function SaveSearches({ userId }: Props) {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  const [getList, { data, isLoading, isFetching }] = useLazySaveSearchesQuery();
  const { data: baseData, isSuccess } = useBaseDataQuery();

  const [rowWatch, setRowWatch] = useState<{
    name: string;
    createdAt: string;
    data: {
      distance: string;
      depositMax: string;
      depositMin: string;
      area: string;
      typeIds: string[];
    };
  } | null>(null);

  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    const sortType = searchParams.get("sortType") as SortEnum;
    getList({
      userId,
      params: {
        page: page > 0 ? page : undefined,
        perPage: perPage > 0 ? perPage : undefined,
        sortType: sortType ? sortType : undefined,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      disableSortBy: true,
      filterable: false,
    },
    {
      Header: "CreatedAt",
      accessor: "createdAt",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "WatchMore",
      accessor: "watchMore",
      disableSortBy: true,
      filterable: false,
      Cell: ({ row }: { row: { original: any } }) => {
        return (
          <Button
            variant="outlined"
            color="info"
            sx={{ py: 1 }}
            onClick={() => setRowWatch(row.original)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        );
      },
    },
  ];
  baseData && console.log("baseData", baseData);

  return (
    <>
      <ReactTable
        isLoading={isLoading || isFetching}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        columns={useMemo(() => columns, [])}
        data={data?.data?.items}
        limits={data?.data?.pagination.total}
        hasGlobalSearch={false}
        hasAction={false}
        hasFilter={false}
        hasPagination={true}
      />
      <Dialog
        open={rowWatch !== null}
        onClose={() => setRowWatch(null)}
        sx={{
          "& .MuiPaper-root ": {
            minWidth: "50%",
          },
        }}
      >
        <DialogTitle>
          <Stack direction="row" spacing={1.25}>
            <FontAwesomeIcon
              icon={faMapLocationDot}
              style={{ color: theme.palette.primary.main }}
            />
            <Typography variant="h5" color={theme.palette.primary.main}>
              {rowWatch?.name}
            </Typography>
            {rowWatch?.createdAt && (
              <Typography
                variant="caption"
                color={theme.palette.primary.darker}
                fontSize="0.6rem"
              >
                {`(save on ${new Date(rowWatch.createdAt).toDateString()})`}
              </Typography>
            )}
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            "& .MuiTypography-root": {
              fontSize: "1rem !important",
            },
            "& svg": {
              fontSize: "1.3rem !important",
            },
          }}
        >
          {rowWatch?.data ? (
            <Grid container spacing={3}>
              {rowWatch.data?.distance && (
                <Grid item>
                  <Stack direction="row" spacing={1.25}>
                    <FontAwesomeIcon
                      icon={faRoad}
                      color={theme.palette.primary.main}
                    />
                    <Typography
                      component="span"
                      color={theme.palette.primary.darker}
                    >
                      {`${rowWatch.data.distance} Mile`}
                    </Typography>
                  </Stack>
                </Grid>
              )}
              {rowWatch.data?.distance && (
                <Grid item>
                  <Stack direction="row" spacing={1.25}>
                    <FontAwesomeIcon
                      icon={faMoneyBillTrendUp}
                      color={theme.palette.primary.main}
                    />
                    <Typography
                      component="span"
                      color={theme.palette.primary.darker}
                    >
                      {`${
                        rowWatch.data.depositMin
                          ? Number(rowWatch.data.depositMin).toLocaleString() +
                            "£"
                          : "No Min"
                      } - ${
                        rowWatch.data.depositMax
                          ? Number(rowWatch.data.depositMax).toLocaleString() +
                            "£"
                          : "No Max"
                      }`}
                    </Typography>
                  </Stack>
                </Grid>
              )}
              {rowWatch.data?.area && (
                <Grid item>
                  <Stack direction="row" spacing={1.25}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      color={theme.palette.primary.main}
                    />
                    <Typography
                      component="span"
                      color={theme.palette.primary.darker}
                    >
                      {rowWatch.data.area}
                    </Typography>
                  </Stack>
                </Grid>
              )}
              {isSuccess &&
                rowWatch.data?.typeIds?.length > 0 &&
                rowWatch.data?.typeIds.map((typeId: string, key: number) => {
                  return (
                    <Grid item key={key}>
                      {baseData?.data?.propertyFeatures?.length > 0
                        ? baseData?.data?.propertyFeatures.map(
                            (property: any) => {
                              if (Number(property?.id) === Number(typeId))
                                return (
                                  <Stack direction="row" spacing={1.25}>
                                    {property?.icon?.downloadUrl && (
                                      <img
                                        src={property?.icon?.downloadUrl}
                                        alt={property.title}
                                        style={{
                                          width: "20px",
                                          filter:
                                            "invert(39%) sepia(70%) saturate(2368%) hue-rotate(194deg) brightness(105%) contrast(101%)",
                                        }}
                                        color={theme.palette.primary.main}
                                      />
                                    )}
                                    <Typography
                                      component="span"
                                      color={theme.palette.primary.darker}
                                    >
                                      {property.title}
                                    </Typography>
                                  </Stack>
                                );
                              else return "";
                            }
                          )
                        : ""}
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            "null"
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRowWatch(null)} variant="text">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SaveSearches;
