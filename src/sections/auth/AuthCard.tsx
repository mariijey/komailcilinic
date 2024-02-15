import React from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project import
import MainCard, { MainCardProps } from 'components/MainCard';
import Logo from 'components/logo';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }: MainCardProps) => (
  <>
    <Grid item xs={12} sx={{ m: 3, display: 'flex', justifyContent: 'center' }}>
      <Logo />
    </Grid>
    <MainCard
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%'
        }
      }}
      style={{ overflow: 'inherit' }}
      content={false}
      {...other}
      border={false}
      boxShadow
      shadow={(theme: Theme) => theme.customShadows.z1}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  </>
);

export default AuthCard;
