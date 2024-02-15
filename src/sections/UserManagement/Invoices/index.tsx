import { Chip } from "@mui/material";
import ReactTable from "components/Table";
import { isEmpty } from "lodash";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLazyInvoicesQuery } from "store/api/userManagement";
import { Currency, SortEnum } from "types/config";
import { setAmountWithCurrency } from "utils/helpers/main";

type Props = {
  userId?: number | string;
};

type InvoiceStatus = "pending" | "successful" | "failed" | "expired";
type InvoiceType = "add_property" | "buy_plan" | "contract_analyze";

const Invoices = ({ userId }: Props) => {
  const [searchParams] = useSearchParams();
  const [getData, { data, isLoading, isFetching }] = useLazyInvoicesQuery();
  const columns = [
    {
      Header: "Code",
      accessor: "code",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
    },
    {
      Header: "Amount",
      accessor: "amount",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
      Cell: ({
        row,
      }: {
        row: { original: { amount: string | number; currency: Currency } };
      }) => setAmountWithCurrency(row.original.amount, row.original.currency),
    },
    {
      Header: "VAT",
      accessor: "vat",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
    },
    {
      Header: "status",
      accessor: "status",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
      Cell: ({ value }: { value: InvoiceStatus }) => {
        switch (value) {
          case "pending":
            return (
              <Chip variant="combined" color="primary" label={"pending"} />
            );
          case "expired":
            return (
              <Chip variant="combined" color="warning" label={"expired"} />
            );
          case "failed":
            return <Chip variant="combined" color="error" label={"failed"} />;
          case "successful":
          default:
            return (
              <Chip variant="combined" color="success" label={"successful"} />
            );
        }
      },
    },
    {
      Header: "PayedAt",
      accessor: "payedAt",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "Type",
      accessor: "type",
      disableSortBy: true,
      sortName: "sortType",
      filterable: false,
      Cell: ({ value }: { value: InvoiceType }) => {
        switch (value) {
          case "add_property":
            return (
              <Chip variant="outlined" color="info" label={"Add Property"} />
            );
          case "buy_plan":
            return (
              <Chip variant="outlined" color="warning" label={"Buy Plan"} />
            );
          case "contract_analyze":
          default:
            return (
              <Chip
                variant="outlined"
                color="primary"
                label={"Contract Analyze"}
              />
            );
        }
      },
    },
  ];

  useEffect(() => {
    const perPage = searchParams.get("perPage");
    const page = searchParams.get("currentPage");
    const sortType = searchParams.get("sortType") as SortEnum;
    getData({ userId, perPage, page, sortType });
  }, [getData, searchParams, userId]);

  return (
    <ReactTable
      isLoading={isLoading || isFetching}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      columns={useMemo(() => columns, [])}
      data={data?.data?.items}
      limits={data?.data?.pagination.total}
      hasGlobalSearch={false}
      hasAction={false}
      actionList={[]}
      hasFilter={false}
      hasPagination={true}
    />
  );
};

export default Invoices;
