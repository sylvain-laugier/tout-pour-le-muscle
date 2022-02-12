import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AllFitData, AllFitDataKeys } from '../utils/types';
import { useFitData } from '../utils/useFitData';
import { H2 } from './HtmlTags';

interface CustomLineChartProps {
  dataKey: AllFitDataKeys;
  title: string;
  percentage?: boolean;
  sevenDay?: boolean;
  data?: AllFitData[];
  label: string
}
function CustomLineChart({
  dataKey,
  title,
  percentage,
  sevenDay,
  data,
  label
}: CustomLineChartProps) {
  const [fitDataService] = useFitData();
  if (!data) {
    return <> </>;
  }

  const domain = fitDataService?.getDomainRange(dataKey, data) || [0, 0];
  const tickCount = (domain[1] - domain[0]) / 0.5 + 1;
  return (
    <div>
      <H2> {title}</H2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            domain={domain}
            allowDecimals={percentage}
            tickCount={tickCount}
            interval={0}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name={label}
          />

          {sevenDay && (
            <Line
              type="monotone"
              dataKey={`${dataKey}7day`}
              stroke="#D99F9A"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              name={`Moyenne glissante du ${label}`}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;
