import React from 'react';
import './DataBar.scss';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// Import components
import StatusIndicator from '../../../../components/StatusIndicator/StatusIndicator';
import DataItem from './DataItem/DataItem';
import Button from '../../../../components/Button/Button';

export default function DataBar({ realTimeData, number = 1, status = 'online' }) {
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

  return (
    <div className="data-bar">
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
  );
}
