import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import borderData from './ninhbinh-border.json'; // Dữ liệu GeoJSON cho ranh giới Ninh Bình
import { useRef } from 'react';
import './styles.css';

// Thiết lập icon tùy chỉnh cho Marker
const customMarkerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41]
});

// Danh sách các điểm du lịch
const pointsOfInterest = [
  { id: 1, name: 'Tam Cốc Bích Động', position: [20.2163426, 105.9374570], description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."' },
  { id: 2, name: 'Vườn Quốc gia Cúc Phương', position: [20.31726, 105.62084], description: 'Thông tin chi tiết cho Vườn Quốc gia Cúc Phương' },
  { id: 3, name: 'Khu du lịch sinh thái Tràng An', position: [20.2530403, 105.9181796], description: 'Thông tin chi tiết cho Khu du lịch sinh thái Tràng An' },
  { id: 4, name: 'Chùa Bái Đính', position: [20.272705, 105.864065], description: 'Thông tin chi tiết cho Chùa Bái Đính' },
  { id: 5, name: 'Đền vua Đinh và vua Lê', position: [20.285868, 105.906647], description: 'Thông tin chi tiết cho Đền vua Đinh và vua Lê' },
  { id: 6, name: 'Hang Múa', position: [20.2295474, 105.9342536], description: 'Thông tin chi tiết cho Hang Múa' },
  { id: 7, name: 'Núi Non Nước', position: [20.259298333090253, 105.98167432066744], description: 'Thông tin chi tiết cho Núi Non Nước' },
];

const LocationMarker = ({ position, name, description, setSelectedPoint, setIsDetailsPanelOpen }) => {
  return (
    <Marker position={position} icon={customMarkerIcon} eventHandlers={{
      click: () => {
        setSelectedPoint({ name, description, position });
        setIsDetailsPanelOpen(true); // Open panel
      }
    }}>
      <Popup>{name}</Popup>
    </Marker>
  );
}

function NinhBinhTourismMap() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoints, setFilteredPoints] = useState(pointsOfInterest);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const mapViewBounds = [
    [19.8378, 105.4921],  // Góc Tây Nam
    [20.5389, 106.3065]   // Góc Đông Bắc
  ];

  const handleSearch = (query) => {
    const filtered = pointsOfInterest.filter((point) => point.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredPoints(filtered);
  };

  const handleOutsideClick = () => {
    setSelectedPoint(null);
  };

  const mapRef = useRef(null);

  return (
    <div>
      <nav className="navbar">
        <div className='header'>
        <h1>Ninh Binh Tourism</h1>
        </div>
        <div className="navbar-right">
          <i class="fas fa-search" ></i>
          <button>
            <input type="text" class="input-search" placeholder="Tìm kiếm..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); handleSearch(e.target.value); }}></input>
          </button>
        </div>
      </nav>
      <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
        <div className="sidebar">
          <h3 style={{ textAlign: 'center' }}>Danh sách địa điểm</h3>
          <ol className="olcards">
            {filteredPoints.map((point) => (
              <li key={point.id} style={{ "--cardColor": "#36aeb3" }} onClick={() => setSelectedPoint(point)}>
                <div className="content">
                  <div className="icon">🗺️</div>
                  <div className="title">{point.name}</div>
                </div>
                onClick={() => setSelectedPoint(point)}
              </li>
            ))}
          </ol>
        </div>
        <div className="map-container">
          <MapContainer
            ref={mapRef}
            center={[20.2506, 105.7915]}
            zoom={11}
            minZoom={11}
            maxZoom={16}
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
            maxBounds={mapViewBounds}
            maxBoundsViscosity={1}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={borderData} style={{ color: 'black', weight: 2, fillOpacity: 0.08, fillColor: 'cyan' }} />
            {filteredPoints.map((point) => (
              <LocationMarker
                key={point.id}
                position={point.position}
                name={point.name}
                description={point.description}
                setSelectedPoint={setSelectedPoint}
                onClick={() => {
                  mapRef.current.leafletElement.setView(point.position, 15);
                }}
                setIsDetailsPanelOpen={setIsDetailsPanelOpen}

              />
            ))}
          </MapContainer>
        </div>
        <div className={`details-panel ${isDetailsPanelOpen ? 'open' : ''}`}> {/* Conditional class */}
            {selectedPoint && (
              <>
                <button className="close-button" onClick={() => {
                    setSelectedPoint(null);
                    setIsDetailsPanelOpen(false); // Close panel
                  }}>
                  ×
                </button>
                <h4>{selectedPoint.name}</h4>
                <p>{selectedPoint.description}</p>
              {/* Add more detailed information here (images, etc.) */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NinhBinhTourismMap;
