import React, { useState, useEffect } from 'react';
import './SideNav.scss';

import { Link, useLocation } from 'react-router-dom';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// Import components
import NavItem from './NavItem/NavItem';
import Clock from './Clock/Clock';
import NotificationsBell from './NotificationsBell/NotificationsBell';
import Weather, { getWeatherInfo } from './Weather/Weather';

import logo from '../../../assets/images/logo.png';
import Logout from './Logout/Logout';

// Create and export context
export const SideNavContext = React.createContext(undefined);

export default function SideNav() {
  const location = useLocation();

  const [weatherTooltipOpen, setWeatherTooltipOpen] = useState(false);
  const [notificationsTooltipOpen, setNotificationsTooltipOpen] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeatherInfo(position.coords).then((response) => {
        setWeatherInfo(response.data);
      });
    });
  }, []);

  return (
    <SideNavContext.Provider
      value={{
        weatherTooltipOpen,
        setWeatherTooltipOpen,
        notificationsTooltipOpen,
        setNotificationsTooltipOpen,
        weatherInfo,
        setWeatherInfo,
      }}
    >
      <div className="SideNav">
        <div className="top">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="middle">
          {/* <NavItem link="/">
            {location.pathname === '/' ? (
              <FontAwesomeIcon icon={solid('chart-tree-map')} />
            ) : (
              <FontAwesomeIcon icon={regular('chart-tree-map')} />
            )}
          </NavItem> */}
          <NavItem>
            <NotificationsBell />
          </NavItem>
          <NavItem link="/overview">
            {location.pathname === '/overview' ? (
              <FontAwesomeIcon icon={solid('map')} />
            ) : (
              <FontAwesomeIcon icon={regular('map')} />
            )}
          </NavItem>
          <NavItem link="/missions">
            {location.pathname === '/missions' ? (
              <FontAwesomeIcon icon={solid('bullseye-arrow')} />
            ) : (
              <FontAwesomeIcon icon={regular('bullseye-arrow')} />
            )}
          </NavItem>
          <NavItem link="/schedule">
            {location.pathname === '/schedule' ? (
              <FontAwesomeIcon icon={solid('calendar-days')} />
            ) : (
              <FontAwesomeIcon icon={regular('calendar-days')} />
            )}
          </NavItem>
          <NavItem link="/testpage">
            {location.pathname === '/testpage' ? (
              <FontAwesomeIcon icon={solid('cog')} />
            ) : (
              <FontAwesomeIcon icon={regular('cog')} />
            )}
          </NavItem>
        </div>
        <div className="bottom">
          <Logout />
          <Weather />
          <Clock />
          {/* <NotificationsBell /> */}
        </div>
      </div>
    </SideNavContext.Provider>
  );
}
