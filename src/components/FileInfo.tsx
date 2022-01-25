import React from 'react';
import { useFitData } from '../utils/useFitData';

function FileInfo() {
  const [fitDataService] = useFitData();

  return (
    <div>
      <span className="italic">
        Data la plus récente :{' '}
        {fitDataService &&
          fitDataService.getMostRecentDate().toLocaleDateString('fr-fr')}
      </span>
    </div>
  );
}

export default FileInfo;
