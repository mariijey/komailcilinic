import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import Categories from "sections/ContentManagement/Category/List";
import AddIcon from "@mui/icons-material/Add";
import AccessGuard from "utils/route-guard/AccessGuard";

const NewsCategoryList = () => {
  const navigate = useNavigate();
  return (
    <>
      <AccessGuard access={{ roles: [14] }}>
        <Stack direction="row" sx={{ mb: 2 }} justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => navigate("/news/categories/create")}
          >
            New Category
          </Button>
        </Stack>
      </AccessGuard>
      <Categories type="news" />
    </>
  );
};

export default NewsCategoryList;
