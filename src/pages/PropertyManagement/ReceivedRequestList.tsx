import React from "react";
import { useParams } from "react-router";
import ReceivedRequests from "sections/PropertyManagement/ReceivedRequests";

const ReceivedRequestList = () => {
  const { id } = useParams();

  return <ReceivedRequests propertyId={id} />;
};

export default ReceivedRequestList;
