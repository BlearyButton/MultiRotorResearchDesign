import React from 'react';
import './DataItem.scss';

export default function DataItem({ icon, title, data, dataUnit }) {
  return (
    <div className="data-item">
      <div className="top">
        <p className="title">
          {title} ({dataUnit})
        </p>
      </div>
      <div className="bottom">
        <p className="icon">{icon}</p>
        <p className="dataText">{data}</p>
      </div>
    </div>
  );
}
