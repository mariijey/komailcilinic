import React from 'react'
import { TabsProps } from "types/e-commerce";
import { Box } from "@mui/material";

const TabPanel = ({ children, value, index, ...other }: TabsProps) => {
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
};

export default TabPanel