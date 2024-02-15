import ReactTable from "components/Table";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLazyContractListQuery } from "store/api/contractManagement";
import { useSearchParams } from "react-router-dom";
import { SortEnum } from "types/config";
import { getPrice, spiltEmail } from "utils/helpers/main";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  hasFilter?: boolean;
}

const Certificates = ({ hasFilter = false }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [
    getList,
    { data, isLoading: isLoadingData, isFetching: isFetchingData },
  ] = useLazyContractListQuery();


  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    const sortType = searchParams.get("sortType") as SortEnum;
    getList({
      page: page > 0 ? page : undefined,
      perPage: perPage > 0 ? perPage : undefined,
      sortType: sortType ? sortType : undefined,
      status: ["pending_certificate_confirmation",],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
      Header: "Deposit",
      accessor: "deposit",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value?: string }) => (value ? getPrice(value) : "-"),
    },
    {
      Header: "Deposit Payer",
      accessor: "depositPayer",
      disableSortBy: true,
      filterable: false,
    },
    {
      Header: "Detail",
      accessor: "id",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: number }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/certificates-deposit/${value}`)}
        >
          See
        </Button>
      ),
    },
  ];

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
export default Certificates;
