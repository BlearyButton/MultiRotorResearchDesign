import React from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import TokenService from '../../../../services/token.service';
import CustomHistory from '../../../../custom/CustomHistory';

export default function Logout() {
  return (
    <div className="Weather">
      <FontAwesomeIcon
        onClick={() => {
          TokenService.removeLocalAccessToken();

          // Go to the login page and reload
          CustomHistory.replace('/login');
          CustomHistory.go(0);
        }}
        icon={regular('right-from-bracket')}
      />
    </div>
  );
}
