import React from 'react';
import { GoogleMap, Polygon, LoadScript } from '@react-google-maps/api';

const ninhBinhCoordinates = [
    { lat: 20.200035, lng: 105.987515 },
    { lat: 20.202457, lng: 105.986467 },
    { lat: 20.204545, lng: 105.985963},
    { lat: 20.207029, lng: 105.985701 },
    { lat: 20.209041, lng: 105.987168 },
    { lat: 20.210987, lng: 105.984151 },
    { lat: 20.213711, lng: 105.982869 },
    { lat: 20.214201, lng: 105.981076 },
    { lat: 20.214369, lng: 105.979360 },
    { lat: 20.210909, lng: 105.974467 },
    { lat: 20.210574, lng: 105.973000 },
    { lat: 20.210747, lng: 105.970773 },
    { lat: 20.210095, lng: 105.966812 },
    { lat: 20.210358, lng: 105.962869 },
    { lat: 20.209550, lng: 105.958837 },
    { lat: 20.213555, lng: 105.959195 },
    { lat: 20.217171, lng: 105.956955 },
    { lat: 20.218224, lng: 105.957549 },
    { lat: 20.219374, lng: 105.959622 },
    { lat: 20.219601, lng: 105.963048 },
    { lat: 20.220882, lng: 105.965102 },
    { lat: 20.222810, lng: 105.966384 },
    { lat: 20.224372, lng: 105.965013 },
    { lat: 20.225964, lng: 105.963992 },
    { lat: 20.228461, lng: 105.963992 },
    { lat: 20.229502, lng: 105.962021 },
    { lat: 20.227269, lng: 105.958333 },
    { lat: 20.225174, lng: 105.959086 },
    { lat: 20.223462, lng: 105.957038 },
    { lat: 20.222912, lng: 105.954455 },
    { lat: 20.226479, lng: 105.951188 },
    { lat: 20.229897, lng: 105.948643 },
    { lat: 20.231430, lng: 105.944669 },
    { lat: 20.232495, lng: 105.943297 },
    { lat: 20.233860, lng: 105.942525 },
    { lat: 20.235787, lng: 105.942621 },
    
 // Đóng lại biên giới
];

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
};

const center = {
    lat: 20.2500, // Trung tâm tỉnh Ninh Bình
    lng: 105.9750,
};

const options = {
    fillColor: 'lightblue',
    fillOpacity: 0.3,
    strokeColor: 'blue',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
};

function App() {
    return (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={11}
            >
                <Polygon
                    paths={ninhBinhCoordinates}
                    options={options}
                />
            </GoogleMap>
        </LoadScript>
    );
}

export default App;
