import React, { useContext } from 'react';
import './Weather.scss';

import axios from 'axios';

// Import FontAwesome
import WeatherIcon from './WeatherIcon';

// Import components
import Tooltip from '../../../Tooltip/Tooltip';

// Import context
import { SideNavContext } from '../SideNav';

export function getWeatherInfo(coords) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=en&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );
}

export default function Weather() {
  const { weatherTooltipOpen, setWeatherTooltipOpen, weatherInfo } = useContext(SideNavContext);

  return (
    <div className="Weather unselectable">
      <WeatherIcon icon={weatherInfo?.weather && weatherInfo?.weather[0]?.icon} clickEnabled />{' '}
      <Tooltip
        open={weatherTooltipOpen}
        onClose={() => {
          setWeatherTooltipOpen(false);
        }}
        position="bottom"
      >
        <WeatherTooltip />
      </Tooltip>
    </div>
  );
}

function WeatherTooltip() {
  const { weatherInfo } = useContext(SideNavContext);

  if (weatherInfo.weather) {
    return (
      <div className="Weather__tooltip">
        <h3>Weather</h3>
        <div className="Weather__tooltip__content">
          <WeatherIcon icon={weatherInfo.weather[0].icon} />
          <h1>
            {Math.round(weatherInfo.main.temp * 10) / 10}&nbsp;<em>&deg;C</em>
          </h1>
        </div>
        <p>
          Wind speed: <em>{Math.round(weatherInfo.wind.speed * 3.6 * 10) / 10} km/h</em>
        </p>
      </div>
    );
  }

  return (
    <div className="Weather__tooltip">
      <h3>Weather</h3>
      <div className="Weather__tooltip__content">
        <h1>
          - &nbsp;<em>&deg;C</em>
        </h1>
      </div>
      <p>
        Sunny until <em>17:30</em>
      </p>
    </div>
  );
}
