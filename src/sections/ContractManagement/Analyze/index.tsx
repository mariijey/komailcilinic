import ReactTable from "components/Table";
import { useEffect, useMemo } from "react";
import { Chip } from "@mui/material";
import { useLazyAnalyzesQuery } from "store/api/contractManagement";
import { useSearchParams } from "react-router-dom";
import { SortEnum } from "types/config";
import { isEmpty } from "lodash";
import { spiltEmail } from "utils/helpers/main";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

type StatusType = "pending_payment" | "pending_analyze" | "analyzed";

const Enum = {
  pending_payment: "pending_payment",
  pending_analyze: "pending_analyze",
  analyzed: "analyzed",
};

interface Props {
  hasFilter?: boolean;
}
const Analyses = ({  hasFilter = false }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [
    getList,
    { data, isLoading: isLoadingData, isFetching: isFetchingData },
  ] = useLazyAnalyzesQuery();


  const columns = [
    {
      Header: "Tenant",
      accessor: "user",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: { email?: string; id?: string } }) => (
        <Link to={"/user-management/" + value?.id} target="_black">
          {spiltEmail(value?.email)}
        </Link>
      ),
    },
    {
      Header: "Contract",
      accessor: "contractId",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: number }) => (
        <Link to={"/contracts-management/" + value} target="_black">
          Go to contract
        </Link>
      ),
    },
    {
      Header: "Name",
      accessor: "status",
      disableSortBy: true,
      sortName: "sortByName",
      Cell: ({
        row,
        value,
      }: {
        value: StatusType;
        row: { original: { id: number | string } };
      }) => {
        switch (value) {
          case Enum.pending_analyze:
            return (
              <Chip
                variant="outlined"
                color="warning"
                label={"Pending analyze"}
              />
            );
          case Enum.pending_payment:
            return (
              <>
                <Chip
                  variant="combined"
                  color="primary"
                  label={"Pending payment"}
                />
              </>
            );
          case Enum.analyzed:
            return (
              <Chip variant="combined" color="success" label={"Analyzed"} />
            );
        }
      },
    },
    {
      Header: "Requested At",
      accessor: "createdAt",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "Detail",
      accessor: "id",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: number }) => (
        <Button
          variant="contained"
          onClick={() =>
            navigate(`/contracts-management/analyze-details/${value}`)
          }
        >
          View Reuqest
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    const sortType = searchParams.get("sortType") as SortEnum;

    getList({
      page: page > 0 ? page : undefined,
      perPage: perPage > 0 ? perPage : undefined,
      sortType: sortType ? sortType : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <ReactTable
        isLoading={isLoadingData || isFetchingData}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        columns={useMemo(() => columns, [])}
        data={data?.data?.items}
        limits={data?.data.pagination.total}
        hasGlobalSearch={false}
        actionList={[]}
        hasAction={false}
        hasFilter={hasFilter}
        hasPagination={true}
      />
    </>
  );
};
export default Analyses;
