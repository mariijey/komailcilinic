import { LoadingButton } from "@mui/lab";
import { Stack, Box, Button } from "@mui/material";
import ReactTable from "components/Table";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useExportCSVQuery,
  useLazySubscribedListQuery,
} from "store/api/emailsManagement";
import { SortEnum } from "types/config";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Email = {
  id: number;
  email: string;
  createdAt: string;
};

type Props = {};
const SubscribedList = (props: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [customData, setCustomData] = useState<Email[]>([]);

  const [loadingExcel, setLoadingExcel] = useState<boolean>(false);

  const [getList, { data, isLoading, isFetching }] =
    useLazySubscribedListQuery();

  useEffect(() => {
    if (data) {
      setCustomData(
        data?.data.items.map((item: Email) => {
          return { ...item, user: item.email };
        })
      );
    }
  }, [data]);

  const { data: csvFile } = useExportCSVQuery();

  const columns = [
    {
      Header: "User",
      accessor: "user",
      disableSortBy: true,
    },
    {
      Header: "CreatedAt",
      accessor: "createdAt",
      disableSortBy: true,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "Action",
      accessor: "email",
      disableSortBy: true,
      Cell: ({ value }: { value: string }) => (
        <Button
          variant="contained"
          onClick={() => navigate(`/user-management/send-mail?email=${value}`)}
        >
          Send Email
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const perPage = searchParams.get("perPage");
    const page = searchParams.get("currentPage");
    const sortType = searchParams.get("sortType") as SortEnum;
    const searchKey = searchParams.get("searchKey");
    getList({
      page,
      perPage,
      sortType,
      searchKey,
    });
  }, [getList, searchParams]);

  const downloadExcel = () => {
    setLoadingExcel(true);
    const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "subscribedEmails.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setLoadingExcel(false);
  };
  

  return (
    <Stack direction="column" spacing={1.25}>
      <Box alignSelf="flex-end">
        <LoadingButton
          loading={loadingExcel}
          variant="outlined"
          color="success"
          onClick={() => downloadExcel()}
        >
          <BackupTableIcon />
          <Typography variant="subtitle1" sx={{ px: 1 }}>
            Excel
          </Typography>
        </LoadingButton>
      </Box>

      <ReactTable
        isLoading={isLoading || isFetching}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        columns={useMemo(() => columns, [])}
        data={customData}
        limits={data?.data.pagination.total}
        hasGlobalSearch={false}
        actionList={[]}
        hasAction={false}
        hasFilter={false}
        hasPagination={true}
      />
    </Stack>
  );
};

export default SubscribedList;
