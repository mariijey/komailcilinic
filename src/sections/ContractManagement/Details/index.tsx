import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Stack, Tabs, Tab, Box, Divider } from "@mui/material";
import MainCard from "components/MainCard";
import { PendingOutlined, Done } from "@mui/icons-material";
import { useContractQuery, useTextQuery } from "store/api/contractManagement";
import { Link, useParams } from "react-router-dom";
import { TabsProps } from "types/e-commerce";
import Verification from "sections/ContractManagement/Details/Verification";
import Agreement from "sections/ContractManagement/Details/Agreement";
import Images from "sections/ContractManagement/Details/Images";
import TenantIncomeCheck from "sections/ContractManagement/Details/TenantIncomeCheck";
import PropertyCerificate from "sections/ContractManagement/Details/PropertyCerificate";
import AgencyInfo from "sections/ContractManagement/Details/Agency";
import Signs from "sections/ContractManagement/Details/Signs";
import TextDetail from "sections/ContractManagement/Details/TextDetail";
import Payments from "sections/ContractManagement/Details/Payments";
import StepStatus from "sections/ContractManagement/Details/StepStatus";
import BankInfo from "./BankInfo";

const ContractDetail = () => {
  const { id } = useParams();
  const { data } = useContractQuery(id);
  const { data: textData } = useTextQuery(id);

  const [steps, setSteps] = useState<
    { name: string; completed: boolean }[] | null
  >(null);

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `product-details-tab-${index}`,
      "aria-controls": `product-details-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    if (data) {
      setSteps([
        {
          name: "Verification",
          completed: data.data.verificationsStatus === "completed",
        },
        {
          name: "Agreement",
          completed: data.data.paymentAgreementStatus === "completed",
        },
        {
          name: "Images and defects",
          completed: data.data.imagesStatus === "completed",
        },
        {
          name: "Tenant income check",
          completed: data.data.tenantIncomeCheck === "can_pay",
        },
        {
          name: "Property Certificates",
          completed: data.data.certificatesStatus === "completed",
        },
        {
          name: "agency info",
          completed: data.data.agencyStatus === "completed",
        },
        {
          name: "Signing the contract",
          completed: data.data.signsStatus === "completed",
        },
        {
          name: "Agreement text",
          completed: data.data.contractTextAgreementStatus === "completed",
        },
        {
          name: "bank accounts",
          completed: data.data.bankInfoStatus === "completed",
        },
      ]);
    }
  }, [data]);


  return (
    <Fragment>
      <MainCard>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="product description tabs example"
          variant="scrollable"
        >
          {steps?.map((item) => (
            <Tab
              component={Link}
              key={item.name}
              to="#"
              label={
                <Stack direction={"row"} alignItems={"center"}>
                  {item.name}{" "}
                  {item.completed ? (
                    <Done className="ml-5" color="success" />
                  ) : (
                    <PendingOutlined className="ml-5" color="warning" />
                  )}
                  {/* <Chip
                    variant="outlined"
                    color={item.completed ? "success" : "warning"}
                    label={item.completed ? "complete" : "in progress"}
                    className="ml-5"
                  /> */}
                </Stack>
              }
              {...a11yProps(0)}
            />
          ))}
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Verification data={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Agreement data={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Images data={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TenantIncomeCheck data={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <PropertyCerificate data={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <AgencyInfo data={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Signs data={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <TextDetail data={data?.data} textData={textData?.data} />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <BankInfo data={data?.data} />
        </TabPanel>
      </MainCard>
      <StepStatus status={data?.data?.status} />
      {/* {data?.data?.status=="accept_settlement"||} */}
      <Payments contractStatus={data?.data.status} />
    </Fragment>
  );
};

export default ContractDetail;

function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
