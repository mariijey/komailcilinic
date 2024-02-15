import { Skeleton } from "@mui/material";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface MapViewProps {
  center: [number, number];
  zoom: number;
  bounds: MapBounds;
  isLoading: boolean;
}

const AnyReactComponent = ({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: number;
  lng: number;
}) => (
  <div>
    <LocationOnIcon color="primary" fontSize="large" />
  </div>
);

const MapView = ({ center, zoom, bounds, isLoading }: MapViewProps) => {
  const defaultProps = {
    center: {
      lat: center[0],
      lng: center[1],
    },
  };
  return isLoading ? (
    <Skeleton
      variant="rectangular"
      style={{ height: "300px", width: "100%" }}
    />
  ) : (
    <div style={{ height: "calc(100% - 65px)", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDiPcesHAvT10wtbtaQ8WgZBnrBKGnUAyM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={zoom}
      >
        <AnyReactComponent lat={center[0]} lng={center[1]} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default MapView;
