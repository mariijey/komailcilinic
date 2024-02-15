import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import Posts from "sections/ContentManagement/Post/List";
import AddIcon from "@mui/icons-material/Add";
import AccessGuard from "utils/route-guard/AccessGuard";

const NewsList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      Header: "Banner",
      accessor: "banner",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: { value: { downloadUrl: string } }) =>
        value?.downloadUrl ? (
          <img src={value?.downloadUrl} alt="post-image" width="50px" />
        ) : (
          "-"
        ),
    },
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
      Header: "Views Count",
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
            onClick={() => navigate("/news/create")}
          >
            New Post
          </Button>
        </Stack>
      </AccessGuard>
      <Posts type="news" columns={columns} />
    </>
  );
};
export default NewsList;
