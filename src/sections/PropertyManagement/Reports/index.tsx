import ReactTable from "components/Table";
import { isEmpty } from "lodash";
import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useApproveReportMutation,
  useLazyAllPropertyReportsQuery,
  useLazyPropertyReportsQuery,
} from "store/api/propertyManagement";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";

type Props = {
  propertyId?: string | number;
  mode: "allProperties" | "singleProperty";
};

const Reports = ({ propertyId, mode }: Props) => {
  const navigate = useNavigate();
  const [getReports, { data, isLoading, isFetching }] =
    useLazyPropertyReportsQuery();
  const [
    getAllReports,
    { data: allData, isLoading: isLoadingAll, isFetching: isFetchingAll },
  ] = useLazyAllPropertyReportsQuery();

  const [approveReport, { isLoading: isLoadingApproved }] =
    useApproveReportMutation();

  useEffect(() => {
    if (mode === "singleProperty") getReports({ propertyId });
    else getAllReports(null);
  }, [getAllReports, getReports, mode, propertyId]);

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "ReportedBy",
      accessor: "reportedByUser",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({
        value,
      }: {
        value: { id: string | number; email: string | null };
      }) => (
        <>
          {value?.email ? (
            <Link to={`/user-management/${value?.id}`} target="_blank">
              {value?.email?.split("@")[0] || "-"}
            </Link>
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "CreatedAt",
      accessor: "createdAt",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    // {
    //   Header: t("property.report.updatedAt"),
    //   accessor: "updatedAt",
    //   disableSortBy: true,
    //   sortName: "sortByName",
    //   filterable: false,
    //   Cell: ({ value }: { value: string }) =>
    //     isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    // },
    {
      Header: "IsApproved",
      accessor: "isApproved",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({
        value,
        row,
      }: {
        value: boolean;
        row: { original: { id: number | string } };
      }) =>
        value ? (
          <CheckIcon color="success" />
        ) : (
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              approveReport({ id: row.original.id });
            }}
          >
            Approve
          </Button>
        ),
    },
    {
      Header: "ApprovedAt",
      accessor: "approvedAt",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "Property",
      accessor: "reportableId",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: number }) => (
        <Button
          variant="contained"
          onClick={() => navigate(`/property-management/${value}`)}
        >
          See Reports
        </Button>
      ),
    },
  ];

  return (
    <ReactTable
      isLoading={
        mode === "singleProperty"
          ? isLoading || isFetching || isLoadingApproved
          : isLoadingAll || isFetchingAll || isLoadingApproved
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      columns={useMemo(() => columns, [])}
      data={mode === "singleProperty" ? data?.data.items : allData?.data.items}
      limits={
        mode === "singleProperty"
          ? data?.data.pagination.total
          : allData?.data.pagination.total
      }
      hasGlobalSearch={false}
      actionList={[]}
      hasAction={false}
      hasFilter={false}
      hasPagination={true}
    />
  );
};

export default Reports;
