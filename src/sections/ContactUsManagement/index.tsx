import ReactTable from "components/Table";
import { useEffect, useMemo } from "react";
import { useLazyContactsQuery } from "store/api/contactUsManagement";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [searchParams] = useSearchParams();
  const [getList, { data, isLoading, isFetching }] = useLazyContactsQuery();
  const navigate = useNavigate();

  const columns = [
    {
      Header: "name",
      accessor: "name",
      disableSortBy: true,
      filterable: false,
    },
    {
      Header: "email",
      accessor: "email",
      disableSortBy: true,
      filterable: false,
    },

    {
      Header: "topic",
      accessor: "topic",
      disableSortBy: true,
      filterable: false,
    },
    {
      Header: "createdAt",
      accessor: "createdAt",
      disableSortBy: true,
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
  ];

  const actionList = [
    {
      id: 1,
      title: "Detail",
      hasLink: true,
      navigateLink: (id: string | number) => `/contactus-management/${id}`,
    },
    {
      id: 2,
      title: "Send Email",
      handleClick: (row: any) => {
        navigate(`/user-management/send-mail?email=${row.email}`);
      },
    },
  ];

  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    getList({
      page: page > 0 ? page : undefined,
      perPage: perPage > 0 ? perPage : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <ReactTable
        isLoading={isLoading || isFetching}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        columns={useMemo(() => columns, [])}
        data={data?.data.items}
        limits={data?.data.pagination.total}
        hasGlobalSearch={false}
        actionList={actionList}
        hasFilter={false}
        hasPagination={true}
      />
    </>
  );
};
export default Contacts;
