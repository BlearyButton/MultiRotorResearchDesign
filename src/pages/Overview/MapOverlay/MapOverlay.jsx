import React from 'react';
import './MapOverlay.scss';

// Import components
import DataBar from './DataBar/DataBar';
import WaypointsBar from './WaypointsBar/WaypointsBar';

export default function MapOverlay({ realTimeData, waypoints, onWaypointRemoved, onStartFlight, onStopFlight }) {
  return (
    <>
      <div className="map-overlay-left">
        <span className="heading">
          <h2>Map</h2>
        </span>
        <DataBar realTimeData={realTimeData} />
      </div>
      <div className="map-overlay-right">
        <WaypointsBar
          waypoints={waypoints}
          onWaypointRemoved={onWaypointRemoved}
          isFlying={realTimeData?.if}
          onStartFlight={onStartFlight}
          onStopFlight={onStopFlight}
        />
      </div>
    </>
  );
}
