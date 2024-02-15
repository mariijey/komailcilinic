import Logo from "assets/svg/logo.svg";

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  return <img src={Logo} alt="Apollon" width={160} />;
};

export default LogoMain;
