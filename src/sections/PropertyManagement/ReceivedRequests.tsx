import { Chip } from "@mui/material";
import ReactTable from "components/Table";
import { isEmpty } from "lodash";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLazyRequestsQuery } from "store/api/propertyManagement";
import { SortEnum } from "types/config";

type Props = {
  propertyId?: number | string;
};

type RequestStatusEnum =
  | "pending"
  | "approved"
  | "canceled-tenant"
  | "canceled-landlord"
  | "canceled-auto"
  | "accepted-to-rent"
  | "signing-contract"
  | "signed-contract"
  | "expired-contract"
  | "rejected";

const ReceivedRequests = ({ propertyId }: Props) => {
  const [searchParams] = useSearchParams();

  const [getList, { data, isLoading, isFetching }] = useLazyRequestsQuery();

  useEffect(() => {
    const perPage = searchParams.get("perPage");
    const page = searchParams.get("currentPage");
    const sortType = searchParams.get("sortType") as SortEnum;
    const searchKey = searchParams.get("searchKey");

    getList({ propertyId, perPage, page, sortType, searchKey });
  }, [getList, propertyId, searchParams]);
  
  const columns = [
    {
      Header: "FullName",
      accessor: "name",
      disableSortBy: false,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "Email",
      accessor: "email",
      disableSortBy: false,
      sortName: "sortByUser",
      filterable: false,
    },
    {
      Header: "Phone",
      accessor: "phone",
      disableSortBy: true,
      filterable: false,
    },
    {
      Header: "Visit Date",
      accessor: "visitDate",
      disableSortBy: true,
      filterable: false,
      Cell: (value: string) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "Title",
      accessor: "status",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: RequestStatusEnum }) => {
        switch (value) {
          case "canceled-tenant":
            return (
              <Chip
                variant="outlined"
                color="error"
                label={"Canceled Tenant"}
              />
            );
          case "canceled-landlord":
            return (
              <Chip
                variant="combined"
                color="error"
                label={"Canceled Landlord"}
              />
            );
          case "canceled-auto":
            return (
              <Chip variant="light" color="error" label={"Canceled Auto"} />
            );
          case "rejected":
            return <Chip variant="light" color="error" label={"Rejected"} />;
          case "accepted-to-rent":
            return (
              <Chip
                variant="filled"
                color="success"
                label={"Accepted To Rent"}
              />
            );
          case "signing-contract":
            return (
              <Chip
                variant="outlined"
                color="primary"
                label={"Signing Contract"}
              />
            );
          case "signed-contract":
            return (
              <Chip
                variant="combined"
                color="primary"
                label={"Signed Contract"}
              />
            );
          case "expired-contract":
            return (
              <Chip
                variant="combined"
                color="warning"
                label={"Expired Contract"}
              />
            );
          case "pending":
          default:
            return <Chip variant="outlined" color="info" label={"Pending"} />;
        }
      },
    },
    {
      Header: "Message",
      accessor: "message",
      disableSortBy: true,
      filterable: false,
    },
  ];

  return (
    <ReactTable
      isLoading={isLoading || isFetching}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      columns={useMemo(() => columns, [])}
      data={data?.data.items}
      limits={data?.data.pagination.total}
      hasGlobalSearch={false}
      hasAction={false}
      actionList={[]}
      hasFilter={false}
      hasPagination={true}
    />
  );
};

export default ReceivedRequests;
