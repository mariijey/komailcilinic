import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@mui/material";

// project import
import MainCard from "components/MainCard";
import Avatar from "components/@extended/Avatar";
import IconButton from "components/@extended/IconButton";

// third-party
import Slider from "react-slick";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// assets
import {
  DownOutlined,
  UpOutlined,
  RightOutlined,
  LeftOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
} from "@ant-design/icons";

const ImageSlide = ({
  images,
  isLoading,
}: {
  images: string[];
  isLoading: boolean;
}) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const [selected, setSelected] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSelected(images[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const ArrowUp = (props: any) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: "pointer",
        "&:hover": { bgcolor: "transparent" },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0.75,
        ...(!matchDownMD && { mb: 1.25 }),
        lineHeight: 0,
        "&:after": { boxShadow: "none" },
      }}
    >
      {!matchDownMD ? (
        <UpOutlined
          style={{ fontSize: "small", color: theme.palette.secondary.light }}
        />
      ) : (
        <LeftOutlined
          style={{ fontSize: "small", color: theme.palette.secondary.light }}
        />
      )}
    </Box>
  );

  const ArrowDown = (props: any) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: "pointer",
        "&:hover": { bgcolor: "transparent" },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0.75,
        ...(!matchDownMD && { mt: 1.25 }),
        lineHeight: 0,
        "&:after": { boxShadow: "none" },
      }}
    >
      {!matchDownMD ? (
        <DownOutlined
          style={{ fontSize: "small", color: theme.palette.secondary.light }}
        />
      ) : (
        <RightOutlined
          style={{ fontSize: "small", color: theme.palette.secondary.light }}
        />
      )}
    </Box>
  );

  const settings = {
    rows: 1,
    vertical: true,
    verticalSwiping: true,
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    slidesToShow: 3,
    prevArrow: <ArrowUp />,
    nextArrow: <ArrowDown />,
  };

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12} md={10} lg={9}>
          <MainCard
            content={false}
            border={false}
            boxShadow={false}
            shadow={false}
            sx={{
              m: "0 auto",
              maxHeight: "700px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              bgcolor:
                theme.palette.mode === "dark" ? "grey.50" : "secondary.lighter",
              "& .react-transform-wrapper": {
                cursor: "crosshair",
                height: "100%",
              },
              "& .react-transform-component": { height: "100%" },
            }}
          >
            {isLoading ? (
              <Skeleton variant="rectangular" sx={{minHeight:"400px"}}/>
            ) : (
              <TransformWrapper initialScale={1}>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <>
                    <TransformComponent>
                      <CardMedia
                        onClick={() => setModal(!modal)}
                        component="img"
                        image={selected}
                        title="Scroll Zoom"
                        sx={{
                          borderRadius: `4px`,
                          position: "relative",
                        }}
                      />
                    </TransformComponent>
                    <Stack
                      direction="row"
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        zIndex: 1,
                      }}
                    >
                      <IconButton color="secondary" onClick={() => zoomIn()}>
                        <ZoomInOutlined style={{ fontSize: "1.15rem" }} />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => zoomOut()}>
                        <ZoomOutOutlined style={{ fontSize: "1.15rem" }} />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => resetTransform()}
                      >
                        <RedoOutlined style={{ fontSize: "1.15rem" }} />
                      </IconButton>
                    </Stack>
                  </>
                )}
              </TransformWrapper>
            )}
          </MainCard>
        </Grid>
        <Grid item xs={12} md={2} lg={3} sx={{ height: "100%" }}>
          <Box
            sx={{
              "& .slick-slider": {
                display: "flex",
                alignItems: "center",
                mt: 2,
              },
              ...(!matchDownMD && {
                display: "flex",
                maxHeight: "400px",
                height: "100%",
                "& .slick-slider": {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: "10px",
                  width: 100,
                },
                "& .slick-arrow": {
                  "&:hover": { bgcolor: theme.palette.grey.A200 },
                  position: "initial",
                  color: theme.palette.grey[500],
                  bgcolor: theme.palette.grey.A200,
                  p: 0,
                  transform: "rotate(90deg)",
                  borderRadius: "50%",
                  height: 17,
                  width: 19,
                },
              }),
            }}
          >
            <Slider {...settings}>
              {images?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    onClick={() => setSelected(item)}
                    sx={{ p: 1 }}
                  >
                    <Avatar
                      size={"xl"}
                      src={item}
                      variant="rounded"
                      sx={{
                        m: "0 auto",
                        cursor: "pointer",
                        bgcolor: theme.palette.grey[0],
                        border: `1px solid ${theme.palette.grey[200]}`,
                      }}
                    />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageSlide;
