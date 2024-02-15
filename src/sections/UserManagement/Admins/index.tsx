import { Button, Stack } from "@mui/material";
import ReactTable from "components/Table";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLazyGetAdminsQuery } from "store/api/userManagement";
import { SortEnum } from "types/config";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "lodash";
import AdminDialogForm from "./AdminDialogForm";

type Props = {};

const Admins = (props: Props) => {
  //hooks
  const [searchParams] = useSearchParams();
  const theme = useTheme();

  //api
  const [getList, { data, isLoading, isFetching }] = useLazyGetAdminsQuery();

  //states
  const [configModal, setConfigModal] = useState<{
    isOpen: boolean;
    mode: "new" | "edit" | "delete";
    id: number | null;
  }>({
    isOpen: false,
    mode: "new",
    id: null,
  });

  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    const sortType = searchParams.get("sortType") as SortEnum;
    getList({
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
      Header: "Username",
      accessor: "username",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
    },
    {
      Header: "Name",
      accessor: "name",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
    },
    {
      Header: "Email",
      accessor: "email",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
    },
    {
      Header: "Active",
      accessor: "active",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
      Cell: ({ value }: { value: boolean }) => {
        if (value)
          return (
            <FontAwesomeIcon
              icon={faCircleCheck}
              color={theme.palette.success.dark}
            />
          );
        else
          return (
            <FontAwesomeIcon icon={faBan} color={theme.palette.error.dark} />
          );
      },
    },
    {
      Header: "CreatedAt",
      accessor: "createdAt",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "UpdatedAt",
      accessor: "updatedAt",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
  ];

  const actionList = [
    {
      id: 0,
      title: "Edit",
      hasLink: false,
      handleClick: (original: any) => {
        setConfigModal({ isOpen: true, mode: "edit", id: original?.id });
      },
      access: { roles: [7] },
    },
    {
      id: 1,
      title: "Delete",
      hasLink: false,
      handleClick: (original: any) => {
        setConfigModal({ isOpen: true, mode: "delete", id: original.id });
      },
      access: { roles: [8] },
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ mb: 2 }} justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() =>
            setConfigModal({ isOpen: true, mode: "new", id: null })
          }
        >
          New Admin
        </Button>
      </Stack>
      <ReactTable
        isLoading={isLoading || isFetching}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        columns={useMemo(() => columns, [])}
        data={data?.data?.items}
        limits={data?.data?.pagination.total}
        hasGlobalSearch={false}
        hasAction={true}
        actionList={actionList}
        hasFilter={false}
        hasPagination={true}
      />
      <AdminDialogForm
        isOpen={configModal.isOpen}
        handleClose={() =>
          setConfigModal({
            isOpen: false,
            mode: "new",
            id: null,
          })
        }
        mode={configModal.mode}
        adminId={configModal.id}
      />
    </>
  );
};

export default Admins;
