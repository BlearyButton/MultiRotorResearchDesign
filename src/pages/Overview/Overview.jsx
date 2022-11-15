import React, { useEffect, useRef, useState } from 'react';
import '../shared.scss';
import './Overview.scss';

import { toast } from 'react-toastify';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Map from '../../components/Map/Map';
import MapOverlay from './MapOverlay/MapOverlay';
import Chat from '../../components/SignalR/Chat';
import CommandService from '../../services/command.service';

export default function Overview() {
  // center: [5.4697225, 51.441642],
  const [waypoints, setWaypoints] = useState([]);
  const [counter, setCounter] = useState(1);
  const [realTimeData, setRealTimeData] = useState(null);
  const [realTimeRoutes, setRealTimeRoutes] = useState([]);
  // testing
  const [testCoordinates, setTestCoordinates] = useState(null);
  const testCounterRef = useRef(0);

  const updateRealTimeData = (liveData) => {
    const { lo: longitude, la: latitude, if: isFlying, is: isStop } = liveData;
    if (isStop) {
      toast.dismiss();
      toast.error('Flight has stopped!');
      return;
    }

    setRealTimeData((oldVal) => ({ ...oldVal, ...liveData }));

    if (isFlying) {
      setRealTimeRoutes((currRoutes) => [...currRoutes, [longitude, latitude]]);
    }
  };

  const waypointAddedHandler = (coord) => {
    setWaypoints((oldWps) => {
      const newWps = [
        ...oldWps,
        {
          id: counter,
          name: `Waypoint ${counter}`,
          active: false,
          longitude: coord.longitude,
          latitude: coord.latitude,
        },
      ];
      return newWps;
    });

    setCounter((oldCounter) => oldCounter + 1);
  };

  const waypointRemovedHandler = (id) => {
    if (waypoints.length === 1) {
      // Reset counter if there is no waypoint left
      setCounter(1);
    }
    setWaypoints((oldWps) => {
      const updatedWps = [...oldWps.filter((wp) => wp.id !== id)];

      return updatedWps;
    });
  };

  const waypointUpdatedHandler = (id, coord) => {
    setWaypoints((oldWps) => {
      const updatedWps = oldWps.map((wp) => {
        if (wp.id === id) {
          return { ...wp, longitude: coord.longitude, latitude: coord.latitude };
        }

        return wp;
      });

      return updatedWps;
    });
  };

  /** ** TESTING **** */
  useEffect(() => {
    if (testCoordinates === null) return;

    let interval = null;

    // on a regular basis, add more coordinates from the saved list and update the map
    interval = setInterval(() => {
      if (testCounterRef.current < testCoordinates.length) {
        const liveData = {
          ba: 100,
          cu: 10,
          vx: 10,
          vy: 20,
          vz: 30,
          lo: testCoordinates[testCounterRef.current][0].isNaN
            ? testCoordinates[testCounterRef.current - 1][0]
            : testCoordinates[testCounterRef.current][0],
          la: testCoordinates[testCounterRef.current][1].isNaN
            ? testCoordinates[testCounterRef.current - 1][1]
            : testCoordinates[testCounterRef.current][1],
          al: 50,
          if: true,
        };

        updateRealTimeData(liveData);

        // eslint-disable-next-line no-plusplus
        testCounterRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [testCoordinates]);

  const startFlightCommand = async () => {
    fetch('http://localhost:3000/markers.geojson')
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.features[0].geometry.coordinates[0];
        setTestCoordinates(coordinates);
      });

    if (waypoints.length < 2) {
      toast.warn('You should have at least 2 waypoints before flying the drone!');
      return;
    }
    if (!realTimeData) {
      toast.warn('Drone is not connected!');
      return;
    }
    toast.info('Sending flight request!');
    CommandService.startFlight();
  };

  const stopFlightCommand = () => {
    toast.info('Sending stop request!');
    CommandService.stopFlight();
  };

  return (
    <PageWrapper fullscreen>
      <Chat onReceivingRealTimeData={updateRealTimeData} onConnected={() => {}} onReceivingLiveRawData={() => {}} />
      <Map
        realTimeData={realTimeData}
        realTimeRoutes={realTimeRoutes}
        waypoints={waypoints}
        onWaypointAdded={waypointAddedHandler}
        onWaypointUpdated={waypointUpdatedHandler}
      />

      <MapOverlay
        realTimeData={realTimeData}
        waypoints={waypoints}
        onWaypointRemoved={waypointRemovedHandler}
        onStartFlight={startFlightCommand}
        onStopFlight={stopFlightCommand}
      />
    </PageWrapper>
  );
}
