import React from 'react';
import { useFitData } from '../utils/useFitData';
import CustomLineChart from './CustomLineChart';

function GraphContainer() {
  const [fitDataService] = useFitData();
  return (
    <>
      <div className=" grid grid-cols-3 gap-4">
        <CustomLineChart
          data={fitDataService?.fitData}
          dataKey="weight"
          title="Poids"
          label="Poids"
          sevenDay
        />
        <CustomLineChart
          data={fitDataService?.fitData}
          dataKey="fatRate"
          title="Taux de graisse"
          label="Taux de graisse"
          sevenDay
        />
        <CustomLineChart
          data={fitDataService?.fitData}
          dataKey="muscleRate"
          title="Taux de muscle"
          label="Taux de muscle"
          sevenDay
        />
      </div>
      <div className=" grid grid-cols-3 gap-4">
        <CustomLineChart
          data={fitDataService?.fitWeeklyData}
          dataKey="weightWeekly"
          title="Poids / semaine "
          label="Poids "
        />
        <CustomLineChart
          data={fitDataService?.fitWeeklyData}
          dataKey="fatRateWeekly"
          title="Taux de graisse / semaine "
          label="Taux de graisse "
        />
        <CustomLineChart
          data={fitDataService?.fitWeeklyData}
          dataKey="muscleRateWeekly"
          title="Taux de muscle / semaine"
          label="Taux de muscle "
        />
      </div>
      <div className=" grid grid-cols-3 gap-4">
        <CustomLineChart
          data={fitDataService?.fitMonthlyData}
          dataKey="weightWeekly"
          title="Poids / Mois "
          label="Poids "
        />
        <CustomLineChart
          data={fitDataService?.fitMonthlyData}
          dataKey="fatRateWeekly"
          title="Taux de graisse / Mois "
          label="Taux de graisse "
        />
        <CustomLineChart
          data={fitDataService?.fitMonthlyData}
          dataKey="muscleRateWeekly"
          title="Taux de muscle / Mois"
          label="Taux de muscle "
        />
      </div>
    </>
  );
}

export default GraphContainer;
