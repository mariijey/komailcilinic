import React from "react";
import { Params, useParams } from "react-router";
import Reports from "sections/PropertyManagement/Reports";

function PropertyReports() {
  const { id } = useParams() as Params;
  return <Reports propertyId={id} mode="singleProperty" />;
}

export default PropertyReports;
