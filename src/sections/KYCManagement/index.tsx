import ReactTable from "components/Table";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, Button } from "@mui/material";
import { useLazyKYCListQuery } from "store/api/KYCManagement";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { spiltEmail } from "utils/helpers/main";
import SelectFilter from "components/Table/Filter/Select";
import { KYCStatusEnum } from "types/enums";

type KYCStatusType =
  | "active"
  | "success"
  | "failed"
  | "canceled"
  | "expired"
  | "pending_review";

interface Props {
  KYCStatus?: KYCStatusType;
  hasFilter?: boolean;
}
const Properties = ({ KYCStatus, hasFilter = false }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [
    getList,
    { data, isLoading: isLoadingData, isFetching: isFetchingData },
  ] = useLazyKYCListQuery();

  const columns = [
    {
      Header: "Name",
      accessor: "realName",
      disableSortBy: true,
      filterable: false,
    },
    {
      Header: "Phone",
      accessor: "realPhone",
      disableSortBy: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: true,
      Filter: ({ column: { id, Header } }: any) => (
        <SelectFilter
          options={[
            { label: "Active", value: "active" },
            {
              label: "Success",
              value: "success",
            },
            { label: "Failed", value: "failed" },
            {
              label: "Canceled",
              value: "canceled",
            },
            {
              label: "Expired",
              value: "expired",
            },
            {
              label: "Pending Review",
              value: "pending_review",
            },
          ]}
          id={id}
          Header={Header}
        />
      ),
      Cell: ({
        row,
        value,
      }: {
        value: KYCStatusType;
        row: { original: { id: number | string } };
      }) => {
        switch (value) {
          case KYCStatusEnum.pending_review:
            return (
              <Chip
                variant="outlined"
                color="warning"
                label={"Pending Review"}
              />
            );

          case KYCStatusEnum.success:
            return (
              <Chip variant="combined" color="success" label={"Success"} />
            );

          case KYCStatusEnum.active:
            return <Chip variant="combined" color="success" label={"Active"} />;

          case KYCStatusEnum.canceled:
            return <Chip variant="combined" color="error" label={"Canceled"} />;

          case KYCStatusEnum.failed:
            return <Chip variant="combined" color="error" label={"Failed"} />;

          case KYCStatusEnum.expired:
            return <Chip variant="combined" color="error" label={"Expired"} />;
        }
      },
    },
    {
      Header: "Verified At",
      accessor: "verifiedAt",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "Actions",
      accessor: "id",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) => (
        <Button
          variant="contained"
          onClick={() => navigate("/kyc-management/" + value)}
        >
          More Detail
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    // const sortType = searchParams.get("sortType") as SortEnum;
    // const searchKey = searchParams.get("searchKey");
    // const isAgent = searchParams.get("isAgent");
    const status = searchParams.get("status");

    getList({
      page: page > 0 ? page : undefined,
      perPage: perPage > 0 ? perPage : undefined,
      status: isEmpty(KYCStatus) ? [status] : [KYCStatus],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <ReactTable
        isLoading={isLoadingData || isFetchingData}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        columns={useMemo(() => columns, [])}
        data={data?.data.items}
        limits={data?.data.pagination.total}
        hasGlobalSearch={false}
        hasAction={false}
        hasFilter={hasFilter}
        hasPagination={true}
      />
    </>
  );
};
export default Properties;
