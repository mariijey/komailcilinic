import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import Posts from "sections/ContentManagement/Post/List";
import AddIcon from "@mui/icons-material/Add";
import AccessGuard from "utils/route-guard/AccessGuard";

const FAQList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
    {
      Header: "Category",
      accessor: "category",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: any) => (value.title ? value.title : "-"),
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: { value: string }) => new Date(value).toLocaleString(),
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: { value: string }) => new Date(value).toLocaleString(),
    },
    {
      Header: "View Count",
      accessor: "viewsCount",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
    },
  ];

  return (
    <>
      <AccessGuard access={{ roles: [14] }}>
        <Stack direction="row" sx={{ mb: 2 }} justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => navigate("/faq/create")}
          >
            New Faq
          </Button>
        </Stack>
      </AccessGuard>
      <Posts type="faq" columns={columns} />
    </>
  );
};
export default FAQList;
