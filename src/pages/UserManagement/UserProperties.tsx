import { useParams } from "react-router";
import Properties from "sections/PropertyManagement";

function UserProperties() {
  const { id } = useParams();
  const actionList = [
    {
      id: 1,
      title: "Detail",
      hasLink: true,
      navigateLink: (id: string | number) => `/property-management/${id}`,
    },
  ];
  return <Properties actionList={actionList} hasFilter={true} userId={id} />;
}

export default UserProperties;
