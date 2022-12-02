import React, { useContext } from 'react';
import './MissionBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import MissionCard from '../../../../../components/Card/MissionCard/MissionCard';
import { MissionsContext } from '../../../Missions';

export default function MissionBar() {
  const { missions, setMissions, setSelectedMissionId, setSelectedWaypoint } = useContext(MissionsContext);

  if (missions) {
    return (
      <>
        <button
          type="button"
          className="button add-mission fullwidth"
          onClick={() => {
            const newMissions = JSON.parse(JSON.stringify(missions));

            newMissions.unshift({
              id: Date.now(),
              name: '',
              waypoints: [],
              newMission: true,
            });

            setMissions(newMissions);
            setSelectedMissionId(newMissions[0].id);
            setSelectedWaypoint(null);
          }}
          disabled={window._.some(missions, { name: '' })}
        >
          <FontAwesomeIcon color="white" icon={solid('plus')} />
        </button>

        <div className="cards-grid">
          {missions.length > 0 && missions.map((mission) => <MissionCard key={mission.id} missionId={mission.id} />)}
        </div>
      </>
    );
  }
}
