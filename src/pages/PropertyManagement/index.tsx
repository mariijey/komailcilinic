import Properties from "sections/PropertyManagement";

const PropertiesWrapper = () => {
  const actionList = [
    {
      id: 1,
      title: "Detail",
      hasLink: true,
      navigateLink: (id: string | number) => `/property-management/${id}`,
      access: { roles: [9] },
    },
    {
      id: 2,
      title: "Reports",
      hasLink: true,
      navigateLink: (id: string | number) =>
        `/property-management/${id}/reports`,
      access: { roles: [9] },
    },
  ];
  return <Properties actionList={actionList} hasFilter={true} />;
};

export default PropertiesWrapper;

