import ReactTable from "components/Table";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import { useLazyContractListQuery } from "store/api/contractManagement";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { spiltEmail } from "utils/helpers/main";
import SelectFilter from "components/Table/Filter/Select";
import { ContractStatusEnum } from "types/enums";

type ContractStatusType =
  | "in_progress"
  | "pending_deposit"
  | "completed"
  | "canceled"
  | "require_settlement"
  | "request_settlement"
  | "accept_settlement";

interface Props {
  contractStatus?: ContractStatusType;
  actionList: any;
  hasFilter?: boolean;
}
const Properties = ({
  contractStatus,
  actionList,
  hasFilter = false,
}: Props) => {
  const [searchParams] = useSearchParams();

  const [
    getList,
    { data, isLoading: isLoadingData, isFetching: isFetchingData },
  ] = useLazyContractListQuery();

  const columns = [
    {
      Header: "Tenant",
      accessor: "tenant",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: { email?: string; id?: string } }) => (
        <Link to={"/user-management/" + value?.id} target="_black">
          {spiltEmail(value?.email)}
        </Link>
      ),
    },
    {
      Header: "Landlord",
      accessor: "landlord",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: { email?: string; id?: string } }) => (
        <Link to={"/user-management/" + value?.id} target="_black">
          {spiltEmail(value?.email)}
        </Link>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
      sortName: "sortByName",
      Filter: ({ column: { id, Header } }: any) => (
        <SelectFilter
          options={[
            { label: "In progress", value: "in_progress" },
            {
              label: "Pending deposit",
              value: "pending_deposit",
            },
            {
              label: "Pending Certificate Confirmation",
              value: "pending_certificate_confirmation",
            },
            { label: "Completed", value: "completed" },
            {
              label: "Canceled",
              value: "canceled",
            },
            {
              label: "Archived",
              value: "archived",
            },
          ]}
          id={id}
          Header={Header}
        />
      ),
      filterable: true,
      Cell: ({
        row,
        value,
      }: {
        value: ContractStatusType;
        row: { original: { id: number | string } };
      }) => {
        switch (value) {
          case ContractStatusEnum.in_progress:
            return (
              <Chip variant="outlined" color="warning" label={"In progress"} />
            );
          case ContractStatusEnum.pending_deposit:
            return (
              <>
                <Chip
                  variant="combined"
                  color="warning"
                  label={"Pending deposit"}
                />
              </>
            );
          case ContractStatusEnum.pending_certificate_confirmation:
            return (
              <>
                <Chip
                  variant="combined"
                  color="warning"
                  label={"pending Certificate Confirmation"}
                />
              </>
            );
          case ContractStatusEnum.completed:
            return (
              <Chip variant="combined" color="success" label={"Completed"} />
            );
          case ContractStatusEnum.canceled:
            return <Chip variant="combined" color="error" label={"Canceled"} />;

          case ContractStatusEnum.archived:
            return (
              <Chip
                variant="combined"
                color="success"
                label={"Deposit returned"}
              />
            );
        }
      },
    },
    {
      Header: "Started At",
      accessor: "startedAt",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
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
      // sortType: sortType ? sortType : undefined,
      // searchKey: searchKey ? searchKey : undefined,
      // isAgent: isAgent ? isAgent : undefined,
      status: isEmpty(contractStatus) ? [status] : [contractStatus],
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
        actionList={actionList}
        hasFilter={hasFilter}
        hasPagination={true}
      />
    </>
  );
};
export default Properties;
