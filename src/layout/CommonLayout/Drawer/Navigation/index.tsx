// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import { NavItemType } from 'types/menu';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = ({ searchValue }: { searchValue?: string }) => {
  let filteredMenuItems: NavItemType[] = [];

  const navGroups = filteredMenuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={`group-${item.id}`} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  if (navGroups.length <= 0) return <></>;
  else return <Box sx={{ pt: 1 }}>{navGroups}</Box>;
};

export default Navigation;
