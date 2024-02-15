import { Link } from "react-router-dom";
import { To } from "history";

// material-ui
import { ButtonBase } from "@mui/material";
import { SxProps } from "@mui/system";

// project import
import config from "config";
import SmallLogo from "assets/images/logo/small-apollon.png";
import LargeLogo from "assets/images/logo/apollon.png";

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}
const LogoSection = ({ isIcon, sx, to }: Props) => {

  // assets
  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      {isIcon ? (
        <img src={SmallLogo} alt="apollon-small-logo" width="30" />
      ) : (
        <img src={LargeLogo} alt="apollon-logo" width="150" />
      )}
    </ButtonBase>
  );
};

export default LogoSection;
