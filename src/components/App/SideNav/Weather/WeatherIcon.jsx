import { solid, duotone } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { SideNavContext } from '../SideNav';

export default function WeatherIcon({ icon, clickEnabled }) {
  const { weatherTooltipOpen, setWeatherTooltipOpen, setNotificationsTooltipOpen } = useContext(SideNavContext);

  let iconName;
  let iconClass;

  switch (icon) {
    case '01d':
      iconName = solid('sun');
      iconClass = 'sun';
      break;
    case '01n':
      iconName = solid('moon');
      iconClass = 'moon';
      break;
    case '02d':
      iconName = duotone('clouds-sun');
      iconClass = 'clouds-sun';
      break;
    case '02n':
      iconName = duotone('clouds-moon');
      iconClass = 'clouds-moon';
      break;
    case '03d' || '03n':
      iconName = solid('cloud');
      iconClass = 'cloud';
      break;
    case '04d' || '04n':
      iconName = duotone('clouds');
      iconClass = 'clouds';
      break;
    case '09d' || '09n':
      iconName = duotone('cloud-drizzle');
      iconClass = 'cloud-drizzle';
      break;
    case '10d':
      iconName = duotone('cloud-sun-rain');
      iconClass = '';
      break;
    case '10n':
      iconName = duotone('cloud-moon-rain');
      iconClass = '';
      break;
    case '11d' || '11n':
      iconName = duotone('cloud-bolt');
      iconClass = 'cloud-bolt';
      break;
    case '13d' || '13n':
      iconName = solid('snowflake');
      iconClass = 'snowflake';
      break;
    case '50d' || '50n':
      iconName = duotone('cloud-fog');
      iconClass = 'cloud-fog';
      break;
    default:
      iconName = solid('dash');
      iconClass = '';
      break;
  }

  return (
    <FontAwesomeIcon
      onClick={() => {
        if (clickEnabled) {
          setWeatherTooltipOpen(!weatherTooltipOpen);

          if (!weatherTooltipOpen) {
            setNotificationsTooltipOpen(false);
          }
        }
      }}
      icon={iconName}
      className={`weather-icon ${iconClass}`}
    />
  );
}
