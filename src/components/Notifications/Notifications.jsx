import React from 'react';
import './Notifications.scss';

// Import components
import Notification from './Notification/Notification';

export default function Notifications() {
  const data = [
    {
      id: 1,
      messageTitle: 'Drone is offline',
      message: 'message',
      messageType: 'warning',
    },
    {
      id: 2,
      messageTitle: 'Mission grassfield is done',
      message: 'message 2',
      messageType: 'check',
    },
    {
      id: 3,
      messageTitle: 'Mission farmhouse is done',
      message: 'message 3',
      messageType: 'check',
    },
    {
      id: 4,
      messageTitle: 'Mission test is cancelled',
      message: 'message',
      messageType: 'warning',
    },
    {
      id: 5,
      messageTitle: 'Mission is not yet assigned',
      message: 'message',
      messageType: 'error',
    },
  ];

  return (
    <div className="Notifications">
      {data.map((item, index) => (
        <Notification
          key={item.id}
          messageTitle={item.messageTitle}
          message={item.message}
          messageType={item.messageType}
          firstChild={index === 0}
        />
      ))}
    </div>
  );
}
