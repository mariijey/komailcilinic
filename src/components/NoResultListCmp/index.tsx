import React from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { Box, Typography } from '@mui/material';

type Props = {
  minHeight?: number | string;
  subject?: string;
};
const NoResultListCmp = (props: Props) => {
  const { minHeight = 120, subject = '' } = props;
  return (
    <Box
      component={"div"}
      width={"100%"}
      minHeight={minHeight}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        component={"div"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{
          "& .anticon": {
            fontSize: "2.2rem",
            mb: 1,
            color: "warning.main",
          },
        }}
      >
        <WarningOutlined />
        <Box
          component={"div"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            component={"p"}
            variant={"body1"}
            sx={{ color: "secondary.600" }}
          >
            {subject ? `No Results!` : `No Data!`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NoResultListCmp;
