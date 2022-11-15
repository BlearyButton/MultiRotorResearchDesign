import React, { useEffect, useState } from 'react';
import '../shared.scss';
import './Missions.scss';

import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Service from '../../services/drone.service';
import MapOverlay from './MissionMap/MapOverlay/MapOverlay';
import MissionMap from './MissionMap/MissionMap';

export const MissionsContext = React.createContext(undefined);

export default function Missions() {
  const [missions, setMissions] = useState([]);
  const [editMissionId, setEditMissionId] = useState(0);
  const [selectedMissionId, setSelectedMissionId] = useState(0);
  const [selectedWaypoint, setSelectedWaypoint] = useState(0);
  const [waypoints, setWaypoints] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [mapLayer, setMapLayer] = useState(localStorage.getItem('mapLayer') ?? 'streets-v11');

  // If the map layer was changed, store it in the localstorage
  useEffect(() => {
    localStorage.setItem('mapLayer', mapLayer);
  }, [mapLayer]);

  useEffect(() => {
    Service.MissionService.getMissions().then((response) => {
      const responseMissions = response.data.map((responseMission) => ({
        ...responseMission,
        waypoints: window._.orderBy(responseMission.waypoints, 'order', 'asc').map((waypoint, index) => ({
          ...waypoint,
          id: index + 1,
          order: index + 1,
        })),
      }));

      setMissions(responseMissions);

      // Select the first mission as default selected.
      if (responseMissions.length > 0) {
        setSelectedMissionId(responseMissions[0].id);
      }
    });
  }, []);

  useEffect(() => {
    // Set the waypoints
    if (selectedMissionId === 0) {
      setWaypoints([]);
      setSelectedWaypoint(null);
    } else {
      const selectedMissionWaypoints = window._(missions).find({ id: selectedMissionId }).waypoints;
      setWaypoints(selectedMissionWaypoints);

      // If there is no waypoint selected, select the first one and update the popup info.
      if (selectedMissionWaypoints.length > 0) {
        setSelectedWaypoint(selectedMissionWaypoints[0]);
        setPopupInfo(selectedMissionWaypoints[0]);
      }
    }
  }, [selectedMissionId]);

  useEffect(() => {
    let newWaypoints = waypoints;

    // Check if the waypionts are in the right order.
    if (waypoints.map((waypoint, index) => waypoint.order === index + 1).includes(false)) {
      newWaypoints = newWaypoints.map((waypoint, index) => ({ ...waypoint, id: index + 1, order: index + 1 }));
      setWaypoints(newWaypoints);
    }

    const newMissions = missions.map((mission) => {
      if (mission.id === selectedMissionId) return { ...mission, waypoints: newWaypoints };

      return mission;
    });

    setMissions(newMissions);
  }, [waypoints]);

  const waypointAddedHandler = (coord) => {
    if (selectedMissionId !== 0 && editMissionId !== 0) {
      setWaypoints((oldWps) => [
        ...oldWps,
        {
          id: waypoints.length + 1,
          order: waypoints.length + 1,
          active: false,
          longitude: coord.longitude,
          latitude: coord.latitude,
          isHome: false,
        },
      ]);
    }
  };

  const waypointUpdatedHandler = (order, coord) => {
    setWaypoints((oldWps) =>
      oldWps.map((wp) => {
        if (wp.order === order) {
          return { ...wp, longitude: coord.longitude, latitude: coord.latitude };
        }

        return wp;
      })
    );
  };

  return (
    <MissionsContext.Provider
      value={{
        missions,
        setMissions,
        editMissionId,
        setEditMissionId,
        selectedMissionId,
        setSelectedMissionId,
        selectedWaypoint,
        setSelectedWaypoint,
        waypoints,
        setWaypoints,
        popupInfo,
        setPopupInfo,
        mapLayer,
        setMapLayer,
      }}
    >
      <PageWrapper fullscreen>
        <MissionMap
          waypoints={waypoints}
          onWaypointAdded={waypointAddedHandler}
          onWaypointUpdated={waypointUpdatedHandler}
        />

        <MapOverlay />
      </PageWrapper>
    </MissionsContext.Provider>
  );
}
