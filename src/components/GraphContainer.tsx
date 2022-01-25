import React from 'react';
import CustomLineChart from './CustomLineChart';

function GraphContainer() {
  return (
    <div className=" grid grid-cols-3 gap-4">
      <CustomLineChart dataKey="weight" title="Poids" range={0.5} />
      <CustomLineChart
        dataKey="fatRate"
        title="Taux de graisse"
        range={0.1}
        percentage
      />
      <CustomLineChart
        dataKey="muscleRate"
        title="Taux de muscle"
        range={0.1}
        percentage
      />
    </div>
  );
}

export default GraphContainer;
