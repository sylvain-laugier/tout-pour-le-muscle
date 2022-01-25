export interface FitData { 
  bmi: string;
  bodyWaterRate: string;
  boneMass: string;
  fatRate: string ;
  height: string;
  metabolism: string;
  muscleRate: string ;
  time: string;
  visceralFat: string;
  weight: string;
}

export interface FitData7Days { 
  weight7day: number;
  fatRate7day: number;
  muscleRate7day: number;
}

export type FitDataKeys =  keyof FitData;