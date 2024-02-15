import { Button, Stack } from "@mui/material";
import ReactTable from "components/Table";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useLazyGetPermissionsQuery,
  useLazyGetRolesQuery,
} from "store/api/userManagement";
import { SortEnum } from "types/config";
import AddIcon from "@mui/icons-material/Add";
import RoleDialogForm from "./RoleDialogForm";
import { usePermissionsContext } from "contexts/Permissions";

type Props = {};

const Roles = (props: Props) => {
  //hooks
  const [searchParams] = useSearchParams();
  const permissionCtx = usePermissionsContext();

  //api
  const [getList, { data, isLoading, isFetching }] = useLazyGetRolesQuery();
  const [getPermissionsList] = useLazyGetPermissionsQuery();

  useEffect(() => {
    if (!permissionCtx?.permissions)
      getPermissionsList({}).then((res) => {
        permissionCtx?.handlePermissions(res.data.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionCtx]);

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
      Header: "Name",
      accessor: "name",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
    },
    {
      Header: "Description",
      accessor: "description",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
    },
  ];
  const actionList = [
    {
      id: 0,
      title: "Edit",
      hasLink: false,
      handleClick: (original: any) => {
        setConfigModal({ isOpen: true, mode: "edit", id: original.id });
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
          New Role
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
      <RoleDialogForm
        isOpen={configModal.isOpen}
        handleClose={() =>
          setConfigModal({
            isOpen: false,
            mode: "new",
            id: null,
          })
        }
        mode={configModal.mode}
        roleId={configModal.id}
      />
    </>
  );
};

export default Roles;
