export interface FitData {
  bmi: string;
  bodyWaterRate: string;
  boneMass: string;
  fatRate: string;
  height: string;
  metabolism: string;
  muscleRate: string;
  time: string;
  visceralFat: string;
  weight: string;
}

export interface FitData7Days {
  weight7day: string;
  fatRate7day: string;
  muscleRate7day: string;
}

export interface FitWeelkyData {
  time: string;
  muscleRateWeekly: string;
  fatRateWeekly: string;
  weightWeekly: string;
}

export type FitDataKeys = keyof FitData;
export type FitDataExtended = FitData & FitData7Days;

export type AllFitData = FitDataExtended | FitWeelkyData;
export type AllFitDataKeys = keyof FitDataExtended | keyof FitWeelkyData;
