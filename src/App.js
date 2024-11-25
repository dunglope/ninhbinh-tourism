import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import borderData from './ninhbinh-border.json'; // Dữ liệu GeoJSON cho ranh giới Ninh Bình

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
  { id: 1, name: 'Tam Cốc Bích Động', position: [20.2163426, 105.9374570], description: 'Thông tin chi tiết cho Tam Cốc Bích Động' },
  { id: 2, name: 'Vườn Quốc gia Cúc Phương', position: [20.31726, 105.62084], description: 'Thông tin chi tiết cho Vườn Quốc gia Cúc Phương' },
  { id: 3, name: 'Khu du lịch sinh thái Tràng An', position: [20.2530403, 105.9181796], description: 'Thông tin chi tiết cho Khu du lịch sinh thái Tràng An' },
  { id: 4, name: 'Chùa Bái Đính', position: [20.272705, 105.864065], description: 'Thông tin chi tiết cho Chùa Bái Đính' },
  { id: 5, name: 'Đền vua Đinh và vua Lê', position: [20.285868, 105.906647], description: 'Thông tin chi tiết cho Đền vua Đinh và vua Lê' },
  { id: 6, name: 'Hang Múa', position: [20.2295474, 105.9342536], description: 'Thông tin chi tiết cho Hang Múa' },
  { id: 7, name: 'Núi Non Nước', position: [20.259298333090253, 105.98167432066744], description: 'Thông tin chi tiết cho Núi Non Nước' },
];

function NinhBinhTourismMap() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const mapViewBounds = [
    [19.8378, 105.4921],  // Góc Tây Nam
    [20.5389, 106.3065]   // Góc Đông Bắc
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '10px', height: '600px' }}>
      {/* Danh sách địa điểm du lịch */}
      <div style={{ padding: '10px', border: '1px solid #ccc', overflowY: 'auto' }}>
        <h3>Danh sách địa điểm</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {pointsOfInterest.map(point => (
            <li
              key={point.id}
              style={{
                padding: '10px',
                marginBottom: '5px',
                backgroundColor: selectedPoint?.id === point.id ? '#f0f0f0' : '#fff',
                border: '1px solid #ddd',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              onClick={() => setSelectedPoint(point)}
            >
              {point.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Bản đồ OpenStreetMap */}
      <div>
        <MapContainer
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
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON data={borderData} style={{ color: 'black', weight: 2, fillOpacity: 0.08, fillColor: 'cyan' }} />
          {pointsOfInterest.map(point => (
            <Marker
              key={point.id}
              position={point.position}
              icon={customMarkerIcon}
              eventHandlers={{
                click: () => setSelectedPoint(point),
              }}
            >
              <Popup>{point.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Chi tiết địa điểm và Google Maps nhúng */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <iframe
            width="100%"
            height="250px"
            title="Google Map"
            loading="lazy"
            allowFullScreen={true}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75958.41670957246!2d105.97545154999999!3d20.24511945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313670ab6f10c8c1%3A0x888a79884edbe5cc!2zVHAuIE5pbmggQsOsbmgsIE5pbmggQsOsbmg!5e1!3m2!1svi!2s!4v1730893232542!5m2!1svi!2s"
            style={{ border: '2px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ flex: 1, padding: '10px', border: '1px solid #ccc', overflowY: 'auto' }}>
          {selectedPoint ? (
            <div>
              <h3>{selectedPoint.name}</h3>
              <p>{selectedPoint.description}</p>
            </div>
          ) : (
            <p>Nhấn vào điểm du lịch để xem chi tiết</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NinhBinhTourismMap;
