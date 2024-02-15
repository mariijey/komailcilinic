import {
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faEnvelope,
  faGear,
  faHouseCircleCheck,
  faMagnifyingGlass,
  faUserPen,
  faUserTie,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  id: string;
};

function getPathIndex(pathname: string, id: string) {
  let selectedTab = 0;
  switch (pathname) {
    case `/user-management/${id}/agent`:
      selectedTab = 1;
      break;
    case `/user-management/${id}/active-plans`:
      selectedTab = 2;
      break;
    case `/user-management/${id}/email-preference`:
      selectedTab = 3;
      break;
    case `/user-management/${id}/send-email`:
      selectedTab = 4;
      break;
    case `/user-management/${id}/save-searches`:
      selectedTab = 5;
      break;
    case `/user-management/${id}/save-properties`:
      selectedTab = 6;
      break;
    case `/user-management/${id}/contracts`:
      selectedTab = 7;
      break;
    case `/user-management/${id}/personal`:
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

const ProfileTabs = ({ id }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(
    getPathIndex(pathname, id)
  );
  const handleListItemClick = (index: number, route: string) => {
    setSelectedIndex(index);
    navigate(route);
  };
  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() =>
          handleListItemClick(0, `/user-management/${id}/personal`)
        }
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faUserPen} />
        </ListItemIcon>
        <ListItemText primary={"Personal Information"} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1, `/user-management/${id}/agent`)}
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faUserTie} />
        </ListItemIcon>
        <ListItemText primary={"Agent Information"} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() =>
          handleListItemClick(2, `/user-management/${id}/active-plans`)
        }
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faCoins} />
        </ListItemIcon>
        <ListItemText primary={"Active Plans"} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={() =>
          handleListItemClick(3, `/user-management/${id}/email-preference`)
        }
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faGear} />
        </ListItemIcon>
        <ListItemText primary={"Email Preference Setting"} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={() =>
          handleListItemClick(4, `/user-management/${id}/send-email`)
        }
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faEnvelope} />
        </ListItemIcon>
        <ListItemText primary={"Send Email"} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 5}
        onClick={() =>
          handleListItemClick(5, `/user-management/${id}/save-searches`)
        }
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </ListItemIcon>
        <ListItemText primary={"Save Searches"} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 6}
        onClick={() =>
          handleListItemClick(6, `/user-management/${id}/save-properties`)
        }
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faHouseCircleCheck} />
        </ListItemIcon>
        <ListItemText primary={"Save Properties"} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 7}
        onClick={() =>
          handleListItemClick(7, `/user-management/${id}/contracts`)
        }
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={faFileContract} />
        </ListItemIcon>
        <ListItemText primary={"Contracts List"} />
      </ListItemButton>
    </List>
  );
};

export default ProfileTabs;
