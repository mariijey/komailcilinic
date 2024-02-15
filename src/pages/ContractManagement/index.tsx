import Contrates from "sections/ContractManagement";

const ContratesWrapper = () => {
  const actionList = [
    {
      id: 1,
      title: "Detail",
      hasLink: true,
      navigateLink: (id: string | number) => `/contracts-management/${id}`,
      access: { roles: [21] },
    },
  ];
  return <Contrates actionList={actionList} hasFilter={true} />;
};

export default ContratesWrapper;

