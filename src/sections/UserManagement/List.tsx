import { Chip } from "@mui/material";
import ReactTable from "components/Table";
import SelectFilter from "components/Table/Filter/Select";
import { isEmpty } from "lodash";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLazyUserListQuery } from "store/api/userManagement";
import { SortEnum, UserTypeEnum } from "types/config";

const UserList = () => {
  const [searchParams] = useSearchParams();
  const [getList, { data: response, isLoading, isFetching }] =
    useLazyUserListQuery();

  const columns = [
    {
      Header: "Email",
      accessor: "email",
      disableSortBy: false,
      sortName: "sortType",
      filterable: false,
    },
    {
      Header: "FullName",
      accessor: "name",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) => (isEmpty(value) ? "-" : value),
    },
    {
      Header: "UserType",
      accessor: "userType",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: UserTypeEnum }) => {
        switch (value) {
          case UserTypeEnum.AGENT:
            return (
              <Chip
                color="success"
                variant="outlined"
                size="small"
                label={value}
              />
            );
          case UserTypeEnum.INTERESTED:
            return (
              <Chip
                color="warning"
                variant="outlined"
                size="small"
                label={value}
              />
            );
          case UserTypeEnum.LANDLORD:
            return (
              <Chip
                color="primary"
                variant="outlined"
                size="small"
                label={value}
              />
            );
          case UserTypeEnum.TENANT:
            return (
              <Chip
                color="error"
                variant="outlined"
                size="small"
                label={value}
              />
            );
          case UserTypeEnum.OTHER:
            return (
              <Chip
                color="secondary"
                variant="outlined"
                size="small"
                label={value}
              />
            );
          default:
            return "-";
        }
      },
    },
    {
      Header: "Agent",
      accessor: "agent",
      disableSortBy: true,
      filterable: true,
      Filter: ({ column }: any) =>
        SelectFilter({
          options: [
            { value: "1", label: "True" },
            { value: "0", label: "False" },
          ],
          id: "isAgent",
          Header: "IsAgent",
        }),
      Cell: ({ value }: { value: { name: string } }) =>
        isEmpty(value) || isEmpty(value.name) ? "-" : value.name,
    },
    {
      Header: "CreatedAt",
      accessor: "createdAt",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
  ];

  const actionList = [
    {
      id: 0,
      title: "Profile",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}`,
      access: { roles: [1] },
    },
    {
      id: 1,
      title: "Active Plans",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/active-plans`,
      access: { roles: [1, 3] },
    },
    {
      id: 2,
      title: "Invoices",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/invoices`,
      access: { roles: [1] },
    },
    {
      id: 3,
      title: "Properties",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/properties`,
      access: { roles: [1] },
    },
    {
      id: 4,
      title: "Email Preference Setting",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/email-preference`,
      access: { roles: [1] },
    },
    {
      id: 5,
      title: "Save Searches",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/save-searches`,
      access: { roles: [1] },
    },
    {
      id: 6,
      title: "Save Properties",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/save-properties`,
      access: { roles: [1] },
    },
    {
      id: 7,
      title: "Send Mail",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/send-email`,
      access: { roles: [1] },
    },
    {
      id: 8,
      title: "Contracts List",
      hasLink: true,
      navigateLink: (id: any) => `/user-management/${id}/contracts`,
      access: { roles: [1] },
    },
  ];

  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    const sortType = searchParams.get("sortType") as SortEnum;
    const searchKey = searchParams.get("searchKey");
    const isAgent = searchParams.get("isAgent");

    getList({
      page: page > 0 ? page : undefined,
      perPage: perPage > 0 ? perPage : undefined,
      sortType: sortType ? sortType : undefined,
      searchKey: searchKey ? searchKey : undefined,
      isAgent: isAgent ? isAgent : undefined,
    });
  }, [getList, searchParams]);

  return (
    <ReactTable
      isLoading={isLoading || isFetching}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      columns={useMemo(() => columns, [])}
      data={response?.data.items}
      limits={response?.data.pagination.total}
      hasGlobalSearch={true}
      actionList={actionList}
      hasFilter={true}
      hasPagination={true}
    />
  );
};

export default UserList;
