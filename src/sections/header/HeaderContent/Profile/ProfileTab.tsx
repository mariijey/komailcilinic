import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

interface Props {
  handleLogout: () => void;
  handleClose: (event: MouseEvent | TouchEvent | React.MouseEvent<HTMLDivElement>) => void;
}

const ProfileTab = ({ handleLogout, handleClose }: Props) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {
    case '/dashboard/profiles/account/password':
      selectedTab = 1;
      break;
    case '/dashboard/profiles/account/basic':
      selectedTab = 0;
      break;
    default:
      selectedTab = -1;
  }

  const [selectedIndex, setSelectedIndex] = useState(selectedTab);

  const handleListItemClick = (event: MouseEvent | TouchEvent | React.MouseEvent<HTMLDivElement>, index: number) => {
    if (index === 0) {
      navigate('/dashboard/profiles/account/basic');
    }
    if (index === 1) {
      navigate('/dashboard/profiles/account/password');
    }
    setSelectedIndex(index);
    handleClose(event);
  };

  return (
    <List
      component="nav"
      sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}
    >
      {/* <ListItemButton selected={selectedIndex === 0} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary={t('header.userInfo')} />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary={t('header.changePassword')} />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
