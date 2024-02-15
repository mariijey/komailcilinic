import {
  Typography,
  Divider,
  Stack,
  Grid,
  Skeleton,
  IconButton,
  Button,
} from "@mui/material";
import Avatar from "components/@extended/Avatar";
import MainCard from "components/MainCard";
import {
  facebookColor,
  instagramColor,
  twitterColor,
  youtubeColor,
} from "config";
import { useEffect, useState } from "react";
import ProfileTabs from "./ProfileTabs";
import { isEmpty } from "lodash";
import { useGetUserQuery, useInvoicesQuery } from "store/api/userManagement";
import ProfileForm from "./ProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { usePropertyListQuery } from "store/api/propertyManagement";
const avatarImage = require.context("assets/images/users", true);

type Props = {
  id: string;
  focusInput: any;
};

const TabSection = ({ id, focusInput }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(
    avatarImage(`./default.png`).default
  );

  const { data, isLoading } = useGetUserQuery(id);

  const { data: invoiceData, isLoading: isLoadingInvoices } = useInvoicesQuery({
    userId: id,
  });
  const { data: propertyData, isLoading: isLoadingProperties } =
    usePropertyListQuery({
      userId: id,
    });

  useEffect(() => {
    if (data && !isEmpty(data?.data.avatar?.downloadUrl)) {
      setAvatar(data?.data.avatar?.downloadUrl);
    }
  }, [data]);

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              disabled={isLoading}
              color="primary"
              onClick={() => setIsOpen(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            {isLoading ? (
              <Skeleton variant="circular" width={124} height={124} />
            ) : (
              <Avatar
                alt="Avatar 1"
                src={avatar}
                sx={{ width: 124, height: 124, border: "1px dashed" }}
              />
            )}

            <Stack spacing={0.5} alignItems="center">
              {isLoading ? (
                <Skeleton width="100px" />
              ) : (
                <Typography variant="h5">{data?.data.username}</Typography>
              )}
              {isLoading ? (
                <Skeleton width="200px" />
              ) : (
                <Typography color="secondary">{data?.data.name}</Typography>
              )}
            </Stack>
            <Stack spacing={0.5}>
              {isLoading ? (
                <Skeleton variant="text" width="30px" />
              ) : (
                <Button
                  variant="text"
                  disabled={isEmpty(data?.data?.website)}
                  onClick={() => {}}
                  startIcon={<FontAwesomeIcon icon={faGlobe} />}
                >
                  {data?.data?.website}
                </Button>
              )}
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              sx={{ "& svg": { fontSize: "1.15rem", cursor: "pointer" } }}
            >
              <IconButton
                disabled={isEmpty(data?.data?.social?.twitter) || isLoading}
                onClick={() =>
                  window.open(
                    `https://twitter.com/${data?.data?.social.twitter}`,
                    "_blank"
                  )
                }
              >
                {isLoading ? (
                  <Skeleton variant="circular" width="30px" />
                ) : (
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{
                      color: isEmpty(data?.data?.social?.twitter)
                        ? "secondary"
                        : twitterColor,
                    }}
                  />
                )}
              </IconButton>
              <IconButton
                disabled={isEmpty(data?.data?.social?.facebook) || isLoading}
                onClick={() =>
                  window.open(
                    `https://facebook.com/${data?.data?.social.facebook}`,
                    "_blank"
                  )
                }
              >
                {isLoading ? (
                  <Skeleton variant="circular" width="30px" />
                ) : (
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{
                      color: isEmpty(data?.data?.social?.facebook)
                        ? "secondary"
                        : facebookColor,
                    }}
                  />
                )}
              </IconButton>
              <IconButton
                disabled={isEmpty(data?.data?.social?.youtube) || isLoading}
                onClick={() =>
                  window.open(
                    `https://youtube.com/@${data?.data?.social.youtube}`,
                    "_blank"
                  )
                }
              >
                {isLoading ? (
                  <Skeleton variant="circular" width="30px" />
                ) : (
                  <FontAwesomeIcon
                    icon={faYoutube}
                    style={{
                      color: isEmpty(data?.data?.social?.youtube)
                        ? "secondary"
                        : youtubeColor,
                    }}
                  />
                )}
              </IconButton>
              <IconButton
                disabled={isEmpty(data?.data?.social?.instagram) || isLoading}
                onClick={() =>
                  window.open(
                    `https://instagram.com/${data?.data?.social.instagram}`,
                    "_blank"
                  )
                }
              >
                {isLoading ? (
                  <Skeleton variant="circular" width="30px" />
                ) : (
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{
                      color: isEmpty(data?.data?.social?.instagram)
                        ? "secondary"
                        : instagramColor,
                    }}
                  />
                )}
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: "block", md: "none" } }} />
        <Grid item xs={12} sm={6} md={12}>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Stack spacing={0.5} alignItems="center">
              {isLoadingInvoices ? (
                <Skeleton width="100%" />
              ) : (
                <Typography variant="h5">
                  {invoiceData?.data?.pagination?.total}
                </Typography>
              )}
              <Button
                color="primary"
                component="a"
                variant="text"
                href={`/user-management/${id}/invoices`}
              >
                Invoices
              </Button>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              {isLoadingProperties ? (
                <Skeleton width="100%" />
              ) : (
                <Typography variant="h5">
                  {propertyData?.data?.pagination?.total}
                </Typography>
              )}
              <Button
                color="primary"
                component="a"
                variant="text"
                href={`/user-management/${id}/properties`}
              >
                Properties
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileTabs id={id} />
        </Grid>
      </Grid>
      <ProfileForm
        data={data?.data}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </MainCard>
  );
};

export default TabSection;
