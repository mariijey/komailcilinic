import { Params, useParams } from "react-router-dom";
import Property from "sections/PropertyManagement/Details";

const PropertyDetails = () => {
  const params = useParams() as Params;
  const id: string = params.id as string;

  return <Property id={id} />;
};

export default PropertyDetails;
