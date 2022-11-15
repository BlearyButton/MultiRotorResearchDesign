import React, { useContext, useEffect, useRef, useState } from 'react';
import './MissionMap.scss';

import * as turf from '@turf/turf';
import MapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
} from 'react-map-gl';

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MissionsContext } from '../Missions';
import WaypointPopup from './WaypointPopup/WaypointPopup';

export default function MissionMap({ waypoints, onWaypointAdded, onWaypointUpdated }) {
  const [lineStrings, setLineStrings] = useState(null);
  const mapRef = useRef();

  const { editMissionId, selectedMissionId, selectedWaypoint, setSelectedWaypoint, mapLayer } =
    useContext(MissionsContext);

  // Get the center of the given waypoints
  const getCoordinateCenter = () => {
    let minLat = null;
    let maxLat = null;
    let minLong = null;
    let maxLong = null;

    waypoints.forEach((waypoint) => {
      minLat = waypoint.latitude < minLat || minLat == null ? waypoint.latitude : minLat;
      maxLat = waypoint.latitude > maxLat || maxLat == null ? waypoint.latitude : maxLat;
      minLong = waypoint.longitude < minLong || minLong == null ? waypoint.longitude : minLong;
      maxLong = waypoint.longitude > maxLong || maxLong == null ? waypoint.longitude : maxLong;
    });

    if (mapRef.current) {
      mapRef.current.fitBounds(
        [
          [minLong, minLat],
          [maxLong, maxLat],
        ],
        { duration: 1000, maxZoom: 16 }
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (editMissionId === 0) {
        if (waypoints.length > 0) {
          getCoordinateCenter();
        } else if (mapRef.current) {
          mapRef.current.flyTo({
            center: [process.env.REACT_APP_DEFAULT_LONGITUDE, process.env.REACT_APP_DEFAULT_LATITUDE],
            zoom: 16,
            duration: 1000,
          });
        }
      }
    }, 10);
  }, [waypoints, editMissionId, mapRef.current, selectedMissionId]);

  const clickHandler = (data) => {
    const coord = data.lngLat;

    // Check if these coordinates have already been added
    const isCoordAlreadyExisted = waypoints.some((wp) => wp.longitude === coord.lng && wp.latitude === coord.lat);

    if (isCoordAlreadyExisted) {
      window.toast.error('Waypoint with the same coordinates has already exists!');
    } else if (selectedWaypoint) {
      setSelectedWaypoint(null);
    } else {
      onWaypointAdded({
        longitude: coord.lng,
        latitude: coord.lat,
      });
    }
  };

  const markerClickedHandler = (waypoint, e) => {
    e.originalEvent.stopPropagation();

    setSelectedWaypoint(waypoint);
  };

  const markerDraggedHandler = (order, e) => {
    setSelectedWaypoint(null);

    const newCoord = e.lngLat;
    onWaypointUpdated(order, {
      longitude: newCoord.lng,
      latitude: newCoord.lat,
    });
  };

  useEffect(() => {
    if (waypoints.length >= 2) {
      const coordinates = waypoints.map((wp) => [wp.longitude, wp.latitude]);

      const lineString = turf.lineString(coordinates);
      setLineStrings(lineString);
    } else {
      setLineStrings(null);
    }
  }, [waypoints]);

  const renderMarkerIcon = (wp) => {
    if (selectedWaypoint?.order === wp.order) {
      return (
        <FontAwesomeIcon
          className="fa-2x map-waypoint fa-rotate-by"
          style={{ '--fa-rotate-angle': `${wp.heading}deg` }}
          icon={solid('chevron-up')}
        />
      );
    }

    if (wp.order === 1) {
      return <FontAwesomeIcon className="fa-2x map-waypoint" icon={solid('home')} />;
    }

    if (
      waypoints.length > 1 &&
      wp.order === waypoints.length &&
      wp.longitude === waypoints[0].longitude &&
      wp.latitude === waypoints[0].latitude
    ) {
      // Don't display an icon
      return ' ';
    }

    return <FontAwesomeIcon className="fa-2x map-waypoint" icon={solid('location-pin')} />;
  };

  return (
    <>
      <MapGL
        initialViewState={{
          longitude: process.env.REACT_APP_DEFAULT_LONGITUDE,
          latitude: process.env.REACT_APP_DEFAULT_LATITUDE,
          zoom: 16,
          duration: 1000,
        }}
        ref={mapRef}
        projection="globe"
        mapStyle={`mapbox://styles/mapbox/${mapLayer}`}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={clickHandler}
      >
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <NavigationControl position="bottom-right" />
        <ScaleControl />

        {waypoints.map((wp) => (
          <Marker
            id={wp.order}
            key={`marker-${wp.order}`}
            draggable={editMissionId !== 0}
            longitude={wp.longitude}
            latitude={wp.latitude}
            anchor="bottom"
            onClick={(e) => markerClickedHandler(wp, e)}
            onDrag={(e) => markerDraggedHandler(wp.order, e)}
          >
            {renderMarkerIcon(wp)}
          </Marker>
        ))}

        {selectedWaypoint && selectedWaypoint.isHome === false && <WaypointPopup />}

        {lineStrings != null && (
          <Source id="my-data" type="geojson" data={lineStrings}>
            <Layer
              id="drone"
              type="line"
              paint={{
                'line-color': '#acacac',
                'line-width': 3,
              }}
            />
          </Source>
        )}
      </MapGL>
      <div className="overlay" />
    </>
  );
}
