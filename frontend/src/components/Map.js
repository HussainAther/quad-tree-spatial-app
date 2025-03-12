import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ points }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((point, index) => (
        <Marker key={index} position={[point.y, point.x]}>
          <Popup>{point.data}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

