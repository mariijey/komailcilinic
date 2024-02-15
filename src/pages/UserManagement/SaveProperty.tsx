import { useParams } from "react-router";
import SaveProperties from "sections/UserManagement/SaveProperties";

function SavePropertyList() {
  const { id } = useParams();
  return <SaveProperties userId={id} />;
}

export default SavePropertyList;
