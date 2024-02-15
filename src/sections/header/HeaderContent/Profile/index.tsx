import { useMemo, useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

// project import
import Avatar from "components/@extended/Avatar";
import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";
import useAuth from "hooks/useAuth";
import ProfileTab from "./ProfileTab";
import { useSelector } from "react-redux";

// assets
const avatarImage = require.context("assets/images/placeholders/user", true);

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const isLoading = false;
  const theme = useTheme();
  const { logout } = useAuth();
  const userData = useSelector((state: any) => state.menu.userInfo);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event: MouseEvent | TouchEvent | React.MouseEvent<HTMLDivElement>
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen =
    theme.palette.mode === "dark" ? "grey.200" : "grey.300";

  const userAvatar = useMemo(() => {
    // if (data?.avatar) {
    //   return `${BASE_URL}${IMG_PATH_NAME}${data?.avatar || ''}?height=24&fit-cover`;
    // }
    return avatarImage(`./default.png`).default;
    // }, [data?.avatar]);
  }, []);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? "secondary.light"
                : "secondary.lighter",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          {!isLoading ? (
            <>
              <Avatar alt="profile user" src={userAvatar} size="xs" />
              {/* <Typography variant="subtitle1">{`${data?.firstName || ''} ${data?.lastName || ''}`}</Typography> */}
            </>
          ) : (
            <Skeleton width={130} height={22} variant={"rectangular"} />
          )}
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 1.5, py: 0.5 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            {!isLoading ? (
                              <Avatar
                                alt="profile user"
                                src={userAvatar}
                                sx={{ width: 32, height: 32 }}
                              />
                            ) : (
                              <Skeleton
                                width={32}
                                height={32}
                                variant={"circular"}
                              />
                            )}
                            <Stack>
                              {!isLoading ? (
                                <Typography variant="h6">
                                 {userData.name}
                                </Typography>
                              ) : (
                                <Skeleton
                                  width={100}
                                  height={22}
                                  variant={"rectangular"}
                                />
                              )}
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <ProfileTab
                          handleLogout={handleLogout}
                          handleClose={handleClose}
                        />
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
