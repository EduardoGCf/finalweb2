// src/pages/Public/Home.js
import React, { useState, useEffect } from 'react';
import Map from '../../components/Map';
import RoadList from '../../components/RoadList';
import RoadFilter from '../../components/RoadFilter';
import IncidentModal from '../../components/IncidentModal';
import ReportIncidentForm from '../../components/ReportIncidentForm';

import roadsAPI from '../../api/roadsAPI';
import municipalitiesAPI from '../../api/municipalitiesAPI';
import incidentsAPI from '../../api/incidentsAPI';

const Home = () => {
  const [roads, setRoads] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [incidentReasonPhoto, setIncidentReasonPhoto] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const incidentTypes = [
    'Transitable con desvios y/o horarios de circulación',
    'No transitable por conflictos sociales',
    'Restricción vehicular',
    'No transitable tráfico cerrado',
    'Restricción vehicular, especial'
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const r = await roadsAPI.getAll();
        const m = await municipalitiesAPI.getAll();
        const i = await incidentsAPI.getAll();
        setRoads(r);
        setMunicipalities(m);
        setIncidents(i);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    }
    loadData();
  }, []);

  const handleViewRoad = (road) => {
    setSelectedRoad(road);
  };

  const handleViewReason = (road) => {
    setIncidentReasonPhoto(road.incidentReasonPhoto || null);
    setShowIncidentModal(true);
  };

  const filteredRoads = selectedType
    ? roads.filter(r => r.incidentType === selectedType)
    : roads;

 
const handleReportSubmit = async (formData) => {
  try {
    const newIncident = await incidentsAPI.create(formData);
    console.log('Incidente creado:', newIncident);
    alert('Incidente reportado con éxito');
    setShowReportForm(false);
    const updatedIncidents = await incidentsAPI.getAll();
    setIncidents(updatedIncidents);
  } catch (error) {
    console.error('Error al reportar incidente:', error);
    alert('Error al reportar incidente');
  }
};
  const handleCoordinatesSelected = (coords) => {
    setSelectedCoordinates(coords);
    console.log('Coordenadas seleccionadas:', coords);
  };

  return (
    <>
      <h1>Consulta de Rutas y Transitabilidad</h1>
      <button className="btn btn-success mb-3" onClick={() => setShowReportForm(true)}>Reportar Incidente</button>
      <RoadFilter
        incidentTypes={incidentTypes}
        selectedType={selectedType}
        onTypeChange={(val) => setSelectedType(val)}
      />
      <Map
        roads={filteredRoads}
        municipalities={municipalities}
        onRoadClick={handleViewRoad}
        highlightRoad={selectedRoad}
        incidents={incidents}
        onCoordinatesSelected={handleCoordinatesSelected} // Pasamos la función para seleccionar coords
      />
      <RoadList
        roads={filteredRoads}
        onViewRoad={handleViewRoad}
        onViewReason={handleViewReason}
      />

      <IncidentModal
        show={showIncidentModal}
        onHide={() => setShowIncidentModal(false)}
        incidentReasonPhoto={incidentReasonPhoto}
      />
      <ReportIncidentForm
        show={showReportForm}
        onHide={() => setShowReportForm(false)}
        onSubmit={handleReportSubmit}
        selectedCoordinates={selectedCoordinates}
      />
    </>
  );
};

export default Home;
