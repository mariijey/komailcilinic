import { Chip } from "@mui/material";
import ReactTable from "components/Table";
import SelectFilter from "components/Table/Filter/Select";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLazySavePropertiesQuery } from "store/api/userManagement";
import { SortEnum } from "types/config";
import { PropertyEnum, PropertyStatusType } from "types/property";

type Props = {
  userId?: number | string;
};

function SaveProperties({ userId }: Props) {
  const [searchParams] = useSearchParams();
  const [getList, { data, isLoading, isFetching }] =
    useLazySavePropertiesQuery();

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
      Header: "Title",
      accessor: "title",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "Landlord Name",
      accessor: "landlordName",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "Landlord Phone",
      accessor: "landlordPhone",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
      sortName: "sortByName",
      Filter: ({ column: { id, Header } }: any) => (
        <SelectFilter
          options={[
            { label: "Rented", value: "rented" },
            { label: "Listed", value: "listed" },
            { label: "Pending", value: "pending" },
            {
              label: "Pending Payment",
              value: "pending_payment",
            },
            { label: "Canceled", value: "canceled" },
            { label: "Draft", value: "draft" },
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
        value: PropertyStatusType;
        row: { original: { id: number | string } };
      }) => {
        switch (value) {
          case PropertyEnum.rented:
            return <Chip variant="combined" color="success" label={"Rented"} />;
          case PropertyEnum.listed:
            return (
              <>
                <Chip variant="combined" color="info" label={"Listed"} />
              </>
            );
          case PropertyEnum.pending:
            return (
              <Chip variant="combined" color="primary" label={"Pending"} />
            );
          case PropertyEnum.pending_payment:
            return (
              <Chip
                variant="combined"
                color="warning"
                label={"Pending Payment"}
              />
            );
          case PropertyEnum.canceled:
            return <Chip variant="combined" color="error" label={"Canceled"} />;
          case PropertyEnum.draft:
          default:
            return (
              <Chip variant="combined" color="secondary" label={"Draft"} />
            );
        }
      },
    },
  ];

  const actionList = [
    {
      id: 1,
      title: "Detail",
      hasLink: true,
      navigateLink: (id: string | number) => `/property-management/${id}`,
    },
  ];

  return (
    <ReactTable
      isLoading={isLoading || isFetching}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      columns={useMemo(() => columns, [])}
      data={data?.data?.items}
      limits={data?.data?.pagination.total}
      hasGlobalSearch={false}
      actionList={actionList}
      hasFilter={true}
      hasPagination={true}
    />
  );
}

export default SaveProperties;
