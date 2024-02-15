import { useParams } from "react-router";
import SaveSearches from "sections/UserManagement/SaveSearches";

const SaveSearchList = () => {
  const { id } = useParams();

  return <SaveSearches userId={id} />;
};

export default SaveSearchList;
