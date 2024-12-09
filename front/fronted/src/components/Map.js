// src/components/Map.js
import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = { lat: -16.2902, lng: -63.5887 }; 

const Map = ({ roads, municipalities, onRoadClick, highlightRoad, incidents, onCoordinatesSelected }) => {
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleMapClick = useCallback((e) => {
    if (!onCoordinatesSelected) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    onCoordinatesSelected({ lat, lng });
  }, [onCoordinatesSelected]);

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
  };

  const handleCloseInfoWindow = () => {
    setSelectedIncident(null);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={5}
        onClick={handleMapClick}
      >
        {roads.map((road) => (
          <Polyline
            key={road.id}
            path={road.points}
            options={{ strokeColor: road.blocked ? 'red' : 'blue' }}
            onClick={() => onRoadClick && onRoadClick(road)}
          />
        ))}

        {municipalities.map((m) => (
          <Marker key={m.id} position={m.coordinates} />
        ))}

        {incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={inc.coordinates}
            icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            onClick={() => handleIncidentClick(inc)}
          />
        ))}

        {highlightRoad && (
          <Polyline
            path={highlightRoad.points}
            options={{ strokeColor: highlightRoad.blocked ? 'red' : 'green', strokeWeight: 6 }}
          />
        )}

        {selectedIncident && (
          <InfoWindow
            position={selectedIncident.coordinates}
            onCloseClick={handleCloseInfoWindow}
          >
            <div style={{ maxWidth: '200px' }}>
              <h6>{selectedIncident.type}</h6>
              <p><strong>Razón:</strong> {selectedIncident.reason}</p>
              {selectedIncident.photo && (
                <div>
                  <img 
  src={selectedIncident.photo.startsWith('http') 
    ? selectedIncident.photo 
    : process.env.REACT_APP_API_URL + selectedIncident.photo
  } 
  alt="Incidente" 
  style={{ width: '100%', height: 'auto' }} 
/>

                </div>
              )}
              <p><strong>Coordenadas:</strong> {selectedIncident.coordinates.lat}, {selectedIncident.coordinates.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
