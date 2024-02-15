import KYCList from "sections/KYCManagement";

const KYCWrapper = () => {
  // const actionList = [
  //   {
  //     id: 1,
  //     title: "Detail",
  //     hasLink: true,
  //     navigateLink: (id: string | number) => `//${id}`,
  //     access: { roles: [1,3] },
  //   },
  // ];
  return <KYCList hasFilter={true}/>;
};

export default KYCWrapper;

