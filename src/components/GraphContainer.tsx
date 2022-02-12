import React from 'react';
import CustomLineChart from './CustomLineChart';

function GraphContainer() {
  return (
    <div className=" grid grid-cols-3 gap-4">
      <CustomLineChart dataKey="weight" title="Poids" />
      <CustomLineChart dataKey="fatRate" title="Taux de graisse" />
      <CustomLineChart dataKey="muscleRate" title="Taux de muscle" />
    </div>
  );
}

export default GraphContainer;
