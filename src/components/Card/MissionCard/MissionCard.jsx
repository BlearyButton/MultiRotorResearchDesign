import React, { useContext, useEffect, useState } from 'react';
import './MissionCard.scss';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import context
import { MissionsContext } from '../../../pages/Missions/Missions';

import Input from '../../Input/Input';
import Service from '../../../services/drone.service';
import Button from '../../Button/Button';

export default function MissionCard({ missionId }) {
  const {
    missions,
    setMissions,
    editMissionId,
    setEditMissionId,
    selectedMissionId,
    setSelectedMissionId,
    setSelectedWaypoint,
    selectedWaypoint,
    waypoints,
    setWaypoints,
  } = useContext(MissionsContext);

  const [mission, setMission] = useState(window._(missions).find({ id: missionId }));

  let missionNameInput = null;

  // If the missions are changed (so new missions from the API call), get the new mission for this card using the given "missionId" prop.
  useEffect(() => {
    setMission(window._(missions).find({ id: missionId }));
  }, [missions]);

  // If the mission was changed and the name is empty, select that mission (empty names are not allowed).
  useEffect(() => {
    if (mission.name === '') {
      setEditMissionId(missionId);
    }
  }, [mission]);

  // If the current mission card is edited, focus on the name input and select the edited mission (so the card will toggle open).
  useEffect(() => {
    if (editMissionId === missionId) {
      missionNameInput.focus();
      setSelectedMissionId(missionId);
    }
  }, [editMissionId]);

  // Get all missions from the database.
  const getMissions = (selectFirstMission = false) => {
    Service.MissionService.getMissions().then((response) => {
      const responseMissions = response.data.map((responseMission) => ({
        ...responseMission,
        waypoints: window._.orderBy(responseMission.waypoints, 'order', 'asc').map((waypoint, index) => ({
          ...waypoint,
          order: index + 1,
        })),
      }));

      setMissions(responseMissions);

      if (responseMissions.length === 0) {
        setSelectedMissionId(0);
      } else if (selectFirstMission) {
        setSelectedMissionId(responseMissions[0].id);
      }
    });
  };

  const saveMission = () => {
    if (mission.name === '') {
      window.toast.error('Fill in the mission name first.');
      missionNameInput.focus();
    } else if (mission.newMission) {
      const newMission = structuredClone(mission);
      delete newMission.id;
      delete newMission.newMission;

      Service.MissionService.saveMission(newMission).then((response) => {
        if (response.status === 201) {
          window.toast.success('The mission was saved successfully.');

          getMissions(true);
          setEditMissionId(0);
        } else {
          window.toast.error('Something went wrong while saving the mission, please try again.');
        }
      });
    } else {
      Service.MissionService.updateMission(mission).then((response) => {
        if (response.status === 200) {
          window.toast.success('The mission was updated successfully.');

          getMissions(selectedMissionId === 0);
          setEditMissionId(0);
        } else {
          window.toast.error('Something went wrong while updating the mission, please try again.');
        }
      });
    }
  };

  const removeMission = () => {
    // If the removing mission is not a mission yet, just remove the mission from the missions list.
    if (mission.newMission) {
      setMissions(missions.filter((missionFilter) => missionFilter.id !== missionId));
      setSelectedMissionId(missions.length > 0 ? missions[0].id : 0);
    } else {
      Service.MissionService.removeMission(missionId).then((response) => {
        if (response.status === 200) {
          window.toast.success('The mission was removed successfully.');

          getMissions(true);
          setEditMissionId(0);
        } else {
          window.toast.error('Something went wrong while removing the mission, please try again.');
        }
      });
    }
  };

  const updateMissionName = (name) => {
    setMissions(
      missions.map((m) => {
        if (m.id === missionId) {
          const newMission = { ...m, name };
          setMission(newMission);
          return newMission;
        }

        return m;
      })
    );
  };

  const handleRemoveWaypoint = (waypoint) => {
    const newWaypoints = [
      ...waypoints
        .filter((wp) => wp.order !== waypoint.order)
        .map((wp, index) => ({
          ...wp,
          order: index + 1,
        })),
    ];

    if (waypoint.order === selectedWaypoint?.order) {
      setSelectedWaypoint(null);
    } else if (waypoint.order < selectedWaypoint?.order) {
      const newSelectedWaypoint = window._.find(newWaypoints, { order: selectedWaypoint.order - 1 });
      setSelectedWaypoint(newSelectedWaypoint);
    }

    setWaypoints(newWaypoints);
  };

  return (
    <div className="card">
      <div className="top">
        {missionId === selectedMissionId && <div className="border-left" />}

        {editMissionId !== 0 && editMissionId === missionId ? (
          <Input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateMissionName(event.target.value);
                saveMission();
              }
            }}
            className={mission.name === '' ? 'error' : ''}
            handleRef={(input) => {
              missionNameInput = input;
            }}
            handleChange={(event) => {
              updateMissionName(event.target.value);
            }}
            onBlur={() => {
              updateMissionName(mission.name);
            }}
            value={mission.name}
          />
        ) : (
          <button
            type="button"
            className="name word-break-all"
            onClick={() => {
              setSelectedMissionId(missionId);
            }}
          >
            {mission.name}
          </button>
        )}
        <FontAwesomeIcon
          icon={
            editMissionId === selectedMissionId && missionId === selectedMissionId ? solid('pen-slash') : solid('pen')
          }
          className="edit-icon unselectable"
          onClick={() => setEditMissionId(editMissionId === missionId ? 0 : missionId)}
        />
      </div>
      {selectedMissionId === missionId && (
        <div className="bottom">
          <div className="altitude">
            <div className="title"> Altitude</div>
            <div className="height"> 200 m</div>
          </div>
          <div className="waypoints unselectable">
            {waypoints.map((waypoint) => (
              <div role="none" className="item" key={waypoint.order}>
                <FontAwesomeIcon
                  icon={solid('circle')}
                  className={selectedWaypoint?.order === waypoint.order ? 'circle' : 'circle hidden'}
                />
                <div
                  aria-hidden="true"
                  className={selectedWaypoint?.order === waypoint.order ? 'active' : null}
                  onClick={() => {
                    if (selectedWaypoint?.order !== waypoint.order) {
                      setSelectedWaypoint(waypoint);
                    } else {
                      setSelectedWaypoint(null);
                    }
                  }}
                >
                  {`Waypoint ${waypoint.order}`}
                </div>

                {editMissionId === missionId && (
                  <FontAwesomeIcon
                    icon={solid('trash')}
                    className="right red unselectable"
                    onClick={() => {
                      handleRemoveWaypoint(waypoint);
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {editMissionId === missionId && (
            <div className="action-gap">
              {/* Check if the waypoint isn't on home already */}
              {waypoints.length > 1 && waypoints[waypoints.length - 1].isHome === false && (
                <Button
                  buttonClasses="fullwidth"
                  onclick={() => {
                    setWaypoints((oldWps) => [
                      ...oldWps,
                      {
                        id: waypoints.length + 1,
                        order: waypoints.length + 1,
                        active: false,
                        longitude: waypoints[0].longitude,
                        latitude: waypoints[0].latitude,
                        isHome: true,
                      },
                    ]);
                  }}
                >
                  <FontAwesomeIcon icon={solid('plus')} />
                  Add home waypoint
                </Button>
              )}

              <Button
                buttonClasses="fullwidth green buttonsavedelete"
                onclick={() => {
                  saveMission();
                }}
              >
                Save
              </Button>

              <Button
                buttonClasses="red fullwidth buttonsavedelete"
                onclick={() => {
                  if (window.confirm('Are you sure you want to remove the mission?')) {
                    removeMission();
                  }
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
