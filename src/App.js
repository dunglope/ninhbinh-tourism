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
console.log("love u <3");         // why are you here?

// Danh sách các điểm du lịch
const pointsOfInterest = [
  { 
    id: 1,
    name: 'Tam Cốc Bích Động',
    position: [20.2163426, 105.9374570],
    address: 'Thôn Đam Khê, xã Ninh Hải, huyện Hoa Lư, tỉnh Ninh Bình',
    image: process.env.PUBLIC_URL + '/image/tam coc.jpg',
    description: 'Nhắc đến các điểm tham quan tại Ninh Bình chắc chắn ai cũng đã biết Tam Cốc - Bích Động với khung cảnh nên thơ và hữu tình. Khi ghé thăm nơi đây, bạn sẽ được ngồi trên thuyền để xuôi theo dòng sông Ngô Đồng và chiêm ngưỡng vẻ đẹp hùng vĩ của những dãy núi trùng điệp.'
  },
  { 
    id: 2,
    name: 'Vườn Quốc gia Cúc Phương',
    position: [20.31726, 105.62084],
    address: 'Xã Cúc Phương, huyện Nho Quan, tỉnh Ninh Bình.',
    image: process.env.PUBLIC_URL + '/image/cuc phuong.jpg',
    description: 'Bạn sẽ không khỏi choáng ngợp trước vẻ đẹp của thiên nhiên hoang sơ hùng vĩ của rừng quốc gia Cúc Phương. Vườn Cúc Phương nằm trong danh sách những địa điểm nổi tiếng ở Ninh Bình với hệ sinh thái đa dạng cùng thảm động thực vật phong phú giúp bạn có cơ hội khám phá thiên nhiên khi ghé thăm. Ngoài ra, bạn có thể tham gia du lịch sinh thái, nghỉ dưỡng, mạo hiểm hoặc tìm hiểu nền văn hoá và lịch sử nơi đây.'
  },
  {
    id: 3,
    name: 'Quần thể danh thắng Tràng An',
    position: [20.2530403, 105.9181796],
    address: 'Xã Ninh Hải và xã Trường Yên, huyện Hoa Lư, tỉnh Ninh Bình.',
    image: process.env.PUBLIC_URL + '/image/trang an.jpg',
    description: 'Tràng An là thắng cảnh Ninh Bình được UNESCO công nhận là di sản thiên nhiên và di sản văn hoá thế giới. Nơi đây như một bức tranh phong cảnh thiên nhiên với hình ảnh con sông uốn lượn qua những dãy núi đá vôi độc đáo. Ngoài ra, bạn còn được tham quan các hang động tự nhiên kỳ bí khi ghé thăm quần thể danh thắng Tràng An.'
  },
  { 
    id: 4,
    name: 'Chùa Bái Đính',
    position: [20.272705, 105.864065],
    address: 'xã Gia Sinh, huyện Gia Viễn, tỉnh Ninh Bình',
    image: process.env.PUBLIC_URL + '/image/bai dinh.jpg',
    description: 'Chùa Bái Đính là địa điểm du lịch hành hương được nhiều du khách ghé thăm khi đến Ninh Bình bởi nét kiến trúc cổ kính hoành tráng. Khi tới đây, bạn có thể ghé thăm các khu vực như Bảo tháp, Tháp Chuông, điện Phật Bà, hồ Phóng Sinh, tượng Đức Phật Di Lặc,... ' 
  },
  { 
    id: 5, 
    name: 'Đền thờ Vua Đinh Tiên Hoàng', 
    position: [20.285868, 105.906647], 
    address: 'xã Trường Yên, huyện Hoa Lư, Ninh Bình',
    image: process.env.PUBLIC_URL + '/image/vua dinh.jpg',
    description: 'Thông tin chi tiết cho Đền vua Đinh và vua Lê' 
  },
  { 
    id: 6, 
    name: 'Hang Múa', 
    position: [20.2295474, 105.9342536], 
    address: 'Thôn Khê Đầu Hạ, xã Ninh Xuân, huyện Hoa Lư, tỉnh Ninh Bình',
    image: process.env.PUBLIC_URL + '/image/hang mua.jpg',
    description: 'Không xô bồ như các điểm du lịch khác, Hang Múa Ninh Bình mang lại cảm giác bình yên cho du khách khi ghé thăm. Sau khi chinh phục 486 bậc thang đá, bạn sẽ lên đến đỉnh núi Múa để ngắm nhìn trọn vẹn những cánh đồng lúa trải dài cùng hình ảnh thuyền bè trôi trên dòng nước êm đềm.' 
  },
  { 
    id: 7, 
    name: 'Núi Non Nước', 
    position: [20.259298333090253, 105.98167432066744], 
    address: 'Đường Đinh Tiên Hoàng, phường Thanh Bình, thành phố Ninh Bình, tỉnh Ninh Bình.',
    image: process.env.PUBLIC_URL + '/image/nui non nuoc.jpg',
    description: 'Nhắc đến những cảnh đẹp ở Ninh Bình chắc chắn không thể bỏ qua núi Non Nước nằm trên ngã ba sông Vân với sông Đáy, giữa cầu Ninh Bình và cầu Non Nước. Sau khi vượt qua 72 bậc đá, bạn sẽ lên được đỉnh núi Non Nước để tham quan khung cảnh thiên nhiên, nghỉ ngơi và tận hưởng bầu không khí trong lành mát mẻ. Bên cạnh đó, bạn còn được chiêm ngưỡng vẻ đẹp cổ kính của chùa Non Nước được xây dựng từ thời vua Lý Nhân Tông.'
  },
  {
    id: 8,
    name: 'Nhà thờ đá Phát Diệm',
    position: [20.093000, 106.079478],
    address: 'Thị trấn Phát Diệm, huyện Kim Sơn, tỉnh Ninh Bình',
    image: process.env.PUBLIC_URL + '/image/phat diem.jpg',
    description: 'Với hơn 120 năm tuổi, nhà thờ đá Phát Diệm được xây dựng trong khoảng thời gian 30 năm là biểu tượng văn hoá tín ngưỡng của tỉnh Ninh Bình. Khi tới đây, bạn sẽ được chiêm ngưỡng nét kiến trúc độc đáo kết hợp giữa châu Á và châu Âu. Bên cạnh đó, bạn có thể khám phá công trình Phương Đình và check-in tại khu vực Trái tim Đức Mẹ để mang về những tấm hình xịn sò khi ghé thăm Ninh Bình.'
  },
  {
    id: 9,
    name: 'Đầm Vân Long',
    position: [20.367274637123337, 105.88010791618973],
    address: 'Xã Gia Vân, huyện Gia Viễn, tỉnh Ninh Bình',
    image: process.env.PUBLIC_URL + '/image/van long.jpg',
    description: 'Là một trong những địa điểm du lịch ở Ninh Bình, đầm Vân Long là nơi dừng chân kiếm ăn của các loài chim khi di trú. Nơi đây được bao bọc bởi những đảo đá và thung lũng nước rộng lớn như một bức tranh sơn thuỷ hữu tình. Khi đến đầm Vân Long vào mùa hè, bạn sẽ được chiêm ngưỡng những bông hoa sen nở khắp mặt hồ như phủ lên chiếc áo hồng tuyệt đẹp.'
  },
  {
    id: 10,
    name: 'Động Am Tiên',
    position: [20.281541, 105.911459],
    address: 'Xã Trường Yên, huyện Hoa Lư, tỉnh Ninh Bình',
    image: process.env.PUBLIC_URL + '/image/am tien.jpg',
    description: 'Nếu chưa biết Ninh Bình có những điểm du lịch nào thì bạn có thể ghé thăm động Am Tiên để ngắm nhìn khung cảnh thiên nhiên thơ mộng và tận hưởng không khí trong lành. Hồ nước ở động Am Tiên có màu xanh ngọc bích được bao quanh bởi những dãy núi đá sừng sững. Từ động Am Tiên, bạn có thể phóng tầm mắt để quan sát hình ảnh chùa Bái Đính phía xa.'
  }
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
              <li key={point.id} style={{ "--cardColor": "#36aeb3" }} onClick={() => {
                setSelectedPoint(point);
                setIsDetailsPanelOpen(true); // Open panel when clicking on sidebar item

                if (mapRef.current) {
                  mapRef.current.flyTo(point.position, 15, { duration: 1.5 });
                }
              }}>
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
              selectedPoint && point.id === selectedPoint.id ? (
                <LocationMarker
                key={point.id}
                position={point.position}
                name={point.name}
                description={point.description}
                setSelectedPoint={setSelectedPoint}
                setIsDetailsPanelOpen={setIsDetailsPanelOpen}

              />
              ): null
              
            ))}
          </MapContainer>
        </div>
        <div className={`details-panel ${isDetailsPanelOpen ? 'open' : ''}`}>
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
                <p><b>Địa chỉ:</b> {selectedPoint.address}</p> {/* Display address */}
                {selectedPoint.image && <img src={selectedPoint.image} alt={selectedPoint.name} style={{ maxWidth: '100%', height: 'auto' }} />} {/* Display image */}
              {/* Add more detailed information here (images, etc.) */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NinhBinhTourismMap;
