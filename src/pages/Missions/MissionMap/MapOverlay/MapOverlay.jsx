import React, { useContext } from 'react';
import './MapOverlay.scss';

// Import components
import MissionBar from './MissionBar/MissionBar';
import { MissionsContext } from '../../Missions';
import mapBoxStyleLight from '../../../../assets/images/map/ic_default-2x.png';
import mapBoxStyleSatellite from '../../../../assets/images/map/ic_satellite-2x.png';

export default function MapOverlay() {
  const { mapLayer, setMapLayer } = useContext(MissionsContext);

  return (
    <>
      <div className="map-overlay-left">
        <span className="heading">
          <h2 style={{ color: mapLayer === 'streets-v11' ? 'black' : 'white' }}>Missions</h2>
        </span>

        <MissionBar />
      </div>

      <div className="map-overlay-right-bottom" style={{ display: 'flex' }}>
        <button
          type="button"
          className="button map-layer"
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          onClick={() => setMapLayer('streets-v11')}
        >
          <img src={mapBoxStyleLight} alt="Map style light" />
        </button>

        <button
          type="button"
          className="button map-layer"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onClick={() => setMapLayer('satellite-v9')}
        >
          <img src={mapBoxStyleSatellite} alt="Map style satellite" />
        </button>
      </div>
    </>
  );
}
