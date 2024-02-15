import React, { useMemo, useEffect } from "react";
import { Stack, Typography, Chip, Button, Box } from "@mui/material";
import MainCard from "components/MainCard";
import ReactTable from "components/Table";
import { useLazyPaymentsQuery } from "store/api/contractManagement";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { useSearchParams } from "react-router-dom";
import { getPrice } from "utils/helpers/main";
import { NavLink } from "react-router-dom";
import { ContractStatus } from "types/contractManagment";

const Payments = ({ contractStatus }: { contractStatus?: ContractStatus }) => {
  const { id } = useParams();
  const [getList, { data, isLoading, isFetching }] = useLazyPaymentsQuery();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const perPage = Number(searchParams.get("perPage"));
    const page = Number(searchParams.get("currentPage"));
    if (id) {
      getList({
        page: page > 0 ? page : undefined,
        perPage: perPage > 0 ? perPage : undefined,
        id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, id]);

  const columns = [
    {
      Header: "Type",
      accessor: "type",
      disableSortBy: true,
      Cell: ({ value }: { value: string }) => (
        <span className="capitalize">{value}</span>
      ),
    },
    {
      Header: "Amount",
      accessor: "amount",
      disableSortBy: true,
      Cell: ({ value }: { value: string }) => getPrice(value),
    },
    {
      Header: "Is Payed",
      accessor: "isPayed",
      disableSortBy: true,
      Cell: ({ value }: { value: boolean }) =>
        value ? (
          <Chip variant="outlined" color="success" label={"Paid"} />
        ) : (
          <Chip variant="outlined" color="warning" label={"Unpaid"} />
        ),
    },
    {
      Header: "PayedAt",
      accessor: "payedAt",
      disableSortBy: true,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
    {
      Header: "Scheduled Pay Date",
      accessor: "scheduledPayDate",
      disableSortBy: true,
      Cell: ({ value }: { value: string }) =>
        isEmpty(value) ? "-" : new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <Stack mt={2}>
      <MainCard>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb={2}
        >
          <Typography variant="h5" color={"gray"}>
            Tenant's Payments
          </Typography>
          {(contractStatus === "accept_settlement" ||
            contractStatus === "archived") && (
            <NavLink
              to={"/contracts-management/deposit-details/" + id}
              target="_blank"
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  margin: "0px 10px",
                }}
              >
                Return of Deposit Required
              </Button>
            </NavLink>
          )}
        </Box>
        <ReactTable
          isLoading={isLoading || isFetching}
          // eslint-disable-next-line react-hooks/exhaustive-deps
          columns={useMemo(() => columns, [])}
          data={data?.data.items}
          limits={data?.data.pagination.total}
          hasGlobalSearch={false}
          hasPagination={true}
          hasAction={false}
        />
      </MainCard>
    </Stack>
  );
};

export default Payments;
