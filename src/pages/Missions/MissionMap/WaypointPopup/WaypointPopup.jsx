import React, { useContext } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactAnglePicker } from 'react-angle-picker';
import { Popup } from 'react-map-gl';
import { MissionsContext } from '../../Missions';
import Input from '../../../../components/Input/Input';

export default function WaypointPopup() {
  const { selectedWaypoint, setSelectedWaypoint, editMissionId, setEditMissionId, selectedMissionId, setWaypoints } =
    useContext(MissionsContext);

  return (
    <Popup
      anchor="top"
      longitude={selectedWaypoint.longitude}
      latitude={selectedWaypoint.latitude}
      onClose={() => {
        setSelectedWaypoint(null);
      }}
      closeButton={false}
      style={{ width: '400px' }}
    >
      <div>
        <div className="color-grey">
          <p className="popup-title">Waypoint {selectedWaypoint.order}</p>
          <FontAwesomeIcon
            icon={editMissionId === selectedMissionId ? solid('pen-slash') : solid('pen')}
            className="float-right unselectable edit-icon"
            onClick={() => setEditMissionId(editMissionId === selectedMissionId ? 0 : selectedMissionId)}
          />
        </div>

        <br />

        <hr className="color-grey" />

        <div>
          <div>
            <p className="coordinate-title">Longitude</p>
            <div className="coordinate-item">{selectedWaypoint.longitude}</div>
          </div>

          <br />

          <div>
            <p className="coordinate-title">Latitude</p>
            <div className="coordinate-item">{selectedWaypoint.latitude}</div>
          </div>

          {editMissionId !== selectedMissionId && (
            <div>
              <br />

              <div>
                <p className="coordinate-title">Altitude</p>
                <div className="coordinate-item">{selectedWaypoint.altitude}</div>
              </div>

              <br />

              <div>
                <p className="coordinate-title">Heading</p>
                <div className="coordinate-item">{selectedWaypoint.heading}</div>
              </div>
            </div>
          )}

          {editMissionId === selectedMissionId && (
            <div>
              <br />

              <div className="coordinate-box">
                <p className="coordinate-title" style={{ marginTop: '10px' }}>
                  Altitude
                </p>

                <div className="coordinate-item">
                  <Input
                    inputType="number"
                    value={selectedWaypoint.altitude}
                    handleChange={(e) => {
                      setWaypoints((oldWps) =>
                        oldWps.map((wp) => {
                          if (wp.order === selectedWaypoint.order) {
                            return { ...wp, altitude: e.target.value ? Number(e.target.value) : 0 };
                          }

                          return wp;
                        })
                      );
                    }}
                    className="waypoint-info-input"
                  />
                </div>
              </div>

              <br />

              <div className="coordinate-box">
                <p className="coordinate-title" style={{ marginTop: '20px' }}>
                  Heading
                </p>

                <div className="coordinate-item">
                  <Input
                    inputType="number"
                    value={selectedWaypoint.heading}
                    handleChange={(e) => {
                      setWaypoints((oldWps) =>
                        oldWps.map((wp) => {
                          if (wp.order === selectedWaypoint.order) {
                            return {
                              ...wp,
                              heading: e.target.value ? Number(e.target.value) : 0,
                            };
                          }

                          return wp;
                        })
                      );
                    }}
                    className="waypoint-info-input"
                  />

                  <ReactAnglePicker
                    value={selectedWaypoint.heading - 90}
                    onChange={(heading) => {
                      setWaypoints((oldWps) =>
                        oldWps.map((wp) => {
                          if (wp.order === selectedWaypoint.order) {
                            let newHeading = heading + 90;

                            if (newHeading > 360) {
                              newHeading -= 360;
                            }

                            return { ...wp, heading: newHeading };
                          }

                          return wp;
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
}
