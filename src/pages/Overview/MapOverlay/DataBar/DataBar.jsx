import React from 'react';
import './DataBar.scss';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// Import components
import StatusIndicator from '../../../../components/StatusIndicator/StatusIndicator';
import DataItem from './DataItem/DataItem';
import Button from '../../../../components/Button/Button';
import DroneCard from '../../../../components/Card/DroneCard/DroneCard';

export default function DataBar({ realTimeData, number = 1, status = 'online' }) {
  let assignedCounter = 0;
  let unAssignedCounter = 0;
  const data = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={regular('battery-half')} />,
      title: 'Battery',
      data: realTimeData ? realTimeData.ba : 'Unknown',
      dataUnit: 'V',
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={regular('gauge')} />,
      title: 'Speed',
      data: realTimeData ? (realTimeData.cu ? realTimeData.cu : 'Unknown') : 'Unknown',
      dataUnit: 'km/h',
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={regular('timer')} />,
      title: 'Time left',
      data: realTimeData ? (realTimeData.cu ? realTimeData.cu : 'Unknown') : 'Unknown',
      dataUnit: 'min',
    },
    {
      id: 4,
      icon: <FontAwesomeIcon icon={regular('road-circle-check')} />,
      title: 'Covered distance',
      data: realTimeData ? (realTimeData.cu ? realTimeData.cu : 'Unknown') : 'Unknown',
      dataUnit: 'm',
    },
    {
      id: 5,
      icon: <FontAwesomeIcon icon={regular('house')} />,
      title: 'Distance from home',
      data: realTimeData ? (realTimeData.cu ? realTimeData.cu : 'Unknown') : 'Unknown',
      dataUnit: 'm',
    },
  ];
  const assignedButton = () => {
    if (assignedCounter === 0) {
      document.getElementById('caret1').style.rotate = '180deg';
      assignedCounter = 1;

      document.getElementById('assignedCards').style.display = 'block';
    } else {
      document.getElementById('caret1').style.rotate = '0deg';
      assignedCounter = 0;

      document.getElementById('assignedCards').style.display = 'none';
    }
  };

  const unAssignedButton = () => {
    if (unAssignedCounter === 0) {
      document.getElementById('caret2').style.rotate = '180deg';
      unAssignedCounter = 1;

      document.getElementById('unAssignedCards').style.display = 'block';
    } else {
      document.getElementById('caret2').style.rotate = '0deg';
      unAssignedCounter = 0;

      document.getElementById('unAssignedCards').style.display = 'none';
    }
  };

  const droneButton = () => {
    document.getElementById('data').style.visibility = 'visible';
    document.getElementById('drones').style.visibility = 'hidden';
  };

  const hideBar = () => {
    const dataBar = document.getElementById('data-bar');
    if (dataBar.className === 'data-bar') {
      dataBar.className = 'hidden-data-bar';
    } else {
      dataBar.className = 'data-bar';
    }
  };

  return (
    <div id="data-bar" className="data-bar">
      <div id="drones" className="drones">
        <FontAwesomeIcon icon={regular('eye')} onClick={hideBar} />
        <div className="dropdowns">
          <div id="assigned" className="assigned">
            <p id="titleNames" className="titleNames">
              Assigned drones
            </p>
            <FontAwesomeIcon id="caret1" className="iconArrows" onClick={assignedButton} icon={regular('caret-down')} />
            <div id="assignedCards" className="assignedCards">
              <button type="button" onClick={droneButton}>
                <DroneCard number={1} status="online" small />
              </button>
              <button type="button" onClick={droneButton}>
                <DroneCard number={2} status="online" small />
              </button>
              <button type="button" onClick={droneButton}>
                <DroneCard number={3} status="online" small />
              </button>
            </div>
          </div>
          <div id="unAssigned" className="unAssigned">
            <p className="titleNames">Unassigned drones</p>
            <FontAwesomeIcon
              id="caret2"
              className="iconArrows"
              onClick={unAssignedButton}
              icon={regular('caret-down')}
            />
            <div id="unAssignedCards" className="unAssignedCards">
              <DroneCard number={4} status="offline" small />
              <DroneCard number={5} status="offline" small />
              <DroneCard number={6} status="offline" small />
            </div>
          </div>
        </div>
      </div>
      <div id="data" className="data">
        <div className="top">
          <div className={`border-left ${status}`} />
          <p className="name">Drone</p>
          <p className="icon">{number}</p>
          <StatusIndicator number={2} status={status} />
          <p className="route">Grass field</p>
        </div>
        <div className="bottom">
          {data.map((item) => (
            <DataItem key={item.id} icon={item.icon} title={item.title} data={item.data} dataUnit={item.dataUnit} />
          ))}
          <Button classNames="outlined fullwidth">More data</Button>
        </div>
      </div>
    </div>
  );
}
