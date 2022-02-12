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
import { FitDataKeys } from '../utils/types';
import { useFitData } from '../utils/useFitData';
import { H2 } from './HtmlTags';

interface CustomLineChartProps {
  dataKey: FitDataKeys;
  title: string;
  percentage?: boolean;
}
function CustomLineChart({ dataKey, title, percentage }: CustomLineChartProps) {
  const [fitDataService] = useFitData();

  const domain = fitDataService?.getDomainRange(dataKey) || [0, 0];
  const tickCount = (domain[1] - domain[0]) / 0.5 + 1;
  console.log({ domain, tickCount });
  return (
    <div>
      <H2> {title}</H2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={fitDataService?.fitData}
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
            name={title}
          />

          <Line
            type="monotone"
            dataKey={`${dataKey}7day`}
            stroke="#D99F9A"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name={`Moyenne glissante du ${title}`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;
