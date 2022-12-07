import React from 'react';
import './DroneCard.scss';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// Import components

export default function DroneCard({ number, status, small, battery, speed, altitude, timeTravelled }) {
  return (
    <div className={`dCard ${status}`}>
      <div className="top">
        <p className={`icon ${status}`}>{number}</p>
        <p className="name">Drone</p>
        <p className="route">Grass field</p>
      </div>
      {!small && (
        <div className="bottom">
          <div className="icon-text">
            <FontAwesomeIcon icon={solid('arrows-up-down')} />
            <p>{altitude} m</p>
          </div>
          <div className="icon-text">
            <FontAwesomeIcon icon={solid('battery-half')} />
            <p>{battery} %</p>
          </div>
          <div className="icon-text">
            <FontAwesomeIcon icon={solid('clock-rotate-left')} />
            <p>{timeTravelled} min</p>
          </div>
          <div className="icon-text">
            <FontAwesomeIcon icon={solid('timer')} />
            <p>{speed} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}
