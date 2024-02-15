import ReactTable from "components/Table";
import { useEffect, useMemo, useState } from "react";
import { Button, Chip } from "@mui/material";
import { useLazyPropertyListQuery } from "store/api/propertyManagement";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SortEnum } from "types/config";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SelectFilter from "components/Table/Filter/Select";
import { isEmpty } from "lodash";
import { PropertyEnum, PropertyStatusType } from "types/property";
import ChangeStatusDialog from "./ChangeStatusDialog";
import { Typography } from "@mui/material";

interface Props {
  propertyStatus?: PropertyStatusType;
  actionList: any;
  hasFilter?: boolean;
  userId?: number | string;
}

const Properties = ({
  propertyStatus,
  actionList,
  hasFilter = false,
  userId,
}: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | number>("");
  const [defaultStatus, setDefaultStatus] = useState<string>("");

  const [
    getList,
    { data, isLoading: isLoadingData, isFetching: isFetchingData },
  ] = useLazyPropertyListQuery();

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "Name",
      accessor: "user",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: { value: { name?: string; id?: number } }) => {
        return (
          <Link to={`/user-management/${value?.id}/personal`} target="_blank">
            <Typography color={"black"}>{value?.name}</Typography>
          </Link>
        );
      },
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
            return (
              <Chip
                variant="combined"
                color="success"
                label={"Rented"}
                onDelete={() => handleChangeStatus(row.original.id, value)}
                deleteIcon={<DriveFileRenameOutlineIcon fontSize="small" />}
              />
            );
          case PropertyEnum.listed:
            return (
              <>
                <Chip
                  variant="combined"
                  color="info"
                  label={"Listed"}
                  onDelete={() => handleChangeStatus(row.original.id, value)}
                  deleteIcon={<DriveFileRenameOutlineIcon fontSize="small" />}
                />
              </>
            );
          case PropertyEnum.pending:
            return (
              <Chip
                variant="combined"
                color="primary"
                label={"Pending"}
                onDelete={() => handleChangeStatus(row.original.id, value)}
                deleteIcon={<DriveFileRenameOutlineIcon fontSize="small" />}
              />
            );
          case PropertyEnum.pending_payment:
            return (
              <Chip
                variant="combined"
                color="warning"
                label={"Pending Payment"}
                onDelete={() => handleChangeStatus(row.original.id, value)}
                deleteIcon={<DriveFileRenameOutlineIcon fontSize="small" />}
              />
            );
          case PropertyEnum.canceled:
            return (
              <Chip
                variant="combined"
                color="error"
                label={"Canceled"}
                onDelete={() => handleChangeStatus(row.original.id, value)}
                deleteIcon={<DriveFileRenameOutlineIcon fontSize="small" />}
              />
            );
          case PropertyEnum.draft:
          default:
            return (
              <Chip
                variant="combined"
                color="secondary"
                label={"Draft"}
                onDelete={() => handleChangeStatus(row.original.id, value)}
                deleteIcon={<DriveFileRenameOutlineIcon fontSize="small" />}
              />
            );
        }
      },
    },
    {
      Header: "Received Requests Lists",
      accessor: "name",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ row }: { row: { original: { id: string | number } } }) => (
        <Button
          variant="contained"
          onClick={() =>
            navigate(
              `/property-management/${row.original.id}/received-request-list`
            )
          }
        >
          See Reports
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const perPage = searchParams.get("perPage");
    const page = searchParams.get("currentPage");
    const sortType = searchParams.get("sortType") as SortEnum;
    const searchKey = searchParams.get("searchKey");
    const isAgent = searchParams.get("isAgent");
    const status = searchParams.get("status");
    getList({
      page,
      perPage,
      sortType,
      searchKey,
      isAgent,
      status: isEmpty(propertyStatus) ? [status] : [propertyStatus],
      userId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedId("");
  };

  const handleChangeStatus = (id: string | number, value: string) => {
    setIsOpen(true);
    setSelectedId(id);
    setDefaultStatus(value);
  };

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
      <ChangeStatusDialog
        isOpen={isOpen}
        onClose={handleClose}
        selectedId={selectedId}
        defaultValue={defaultStatus}
      />
    </>
  );
};
export default Properties;
