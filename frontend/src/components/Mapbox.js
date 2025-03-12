import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "your_mapbox_access_token";

const Mapbox = ({ points }) => {
  return (
    <Map
      initialViewState={{ longitude: 0, latitude: 0, zoom: 2 }}
      style={{ width: "100%", height: "500px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {points.map((point, index) => (
        <Marker key={index} longitude={point.x} latitude={point.y} />
      ))}
    </Map>
  );
};

export default Mapbox;

