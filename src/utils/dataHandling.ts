import { isSameDay, isSameWeek, isSameMonth } from 'date-fns';
import subDays from 'date-fns/subDays';
import {
  FitData,
  FitDataExtended,
  FitWeelkyData,
  AllFitDataKeys,
} from './types';

export class FitDataService {
  public fitData: FitDataExtended[];
  public fitWeeklyData: FitWeelkyData[];
  private rawData: FitData[];

  constructor(fitData: FitData[]) {
    this.rawData = fitData;
    this.fitData = this.prepareFitData(fitData);
    this.fitWeeklyData = this.prepareFitWeeklyData(fitData);
  }

  getDomainRange(key: AllFitDataKeys, data: any[]): [number, number] {
    const min =
      Math.floor(Math.min(...data.map((datum) => parseFloat(datum[key]))) * 2) /
      2;
    const max =
      Math.ceil(Math.max(...data.map((datum) => parseFloat(datum[key]))) * 2) /
      2;

    return [min, max];
  }

  prepareFitData(fitData: FitData[]): FitDataExtended[] {
    const rangeArray = Array.from(Array(7).keys());

    return fitData.map((fitDatum) => {
      const date = new Date(fitDatum.time);

      // 7day average
      const { weight7day, fatRate7day, muscleRate7day } = rangeArray.reduce(
        (result, currentValue) => {
          const foundDate = subDays(date, currentValue);
          const foundData = this.getDataForTime(foundDate);

          if (foundData) {
            return {
              weight7day:
                result.weight7day +
                (parseFloat(foundData.weight) - result.weight7day) /
                  result.count,
              fatRate7day:
                result.fatRate7day +
                (parseFloat(foundData.fatRate) - result.fatRate7day) /
                  result.count,
              muscleRate7day:
                result.muscleRate7day +
                (parseFloat(foundData.muscleRate) - result.muscleRate7day) /
                  result.count,
              count: result.count + 1,
            };
          }
          return result;
        },
        { weight7day: 0, fatRate7day: 0, muscleRate7day: 0, count: 1 }
      );

      return {
        ...fitDatum,
        fatRate: parseFloat(fitDatum.fatRate).toFixed(2),
        muscleRate: parseFloat(fitDatum.muscleRate).toFixed(2),
        time: this.getDateFormat(date),
        weight7day: this.roundTo2decimals(weight7day).toFixed(2),
        fatRate7day: this.roundTo2decimals(fatRate7day).toFixed(2),
        muscleRate7day: this.roundTo2decimals(muscleRate7day).toFixed(2),
      };
    });
  }

  prepareFitWeeklyData(fitData: FitData[]) {
    return this.prepareFitAveragelyData(fitData, isSameWeek);
  }
  prepareFitMonthlylyData(fitData: FitData[]) {
    return this.prepareFitAveragelyData(fitData, isSameMonth);
  }

  prepareFitAveragelyData(
    fitData: FitData[],
    timeEqualityFunction: (date: Date, secondDate: Date) => boolean
  ): FitWeelkyData[] {
    const { fitWeeklyData } = fitData.reduce(
      (result, currentValue, i, arr) => {
        const date = new Date(currentValue.time);

        if (i === 0) {
          const { muscleRate, weight, fatRate } = currentValue;
          result.computed = {
            muscleRateWeekly: parseFloat(muscleRate),
            fatRateWeekly: parseFloat(fatRate),
            weightWeekly: parseFloat(weight),
            count: 1,
          };
          return result;
        }
        const previousDate = new Date(arr[i - 1].time);
        if (timeEqualityFunction(date, previousDate)) {
          const { muscleRate, weight, fatRate } = currentValue;
          const {
            muscleRateWeekly,
            fatRateWeekly,
            weightWeekly,
            count,
          } = result.computed;
          result.computed = {
            muscleRateWeekly: muscleRateWeekly + parseFloat(muscleRate),
            fatRateWeekly: fatRateWeekly + parseFloat(fatRate),
            weightWeekly: weightWeekly + parseFloat(weight),
            count: count + 1,
          };
        } else {
          const {
            muscleRateWeekly,
            fatRateWeekly,
            weightWeekly,
            count,
          } = result.computed;
          result.fitWeeklyData.push({
            muscleRateWeekly: (muscleRateWeekly / count).toFixed(2),
            fatRateWeekly: (fatRateWeekly / count).toFixed(2),
            weightWeekly: (weightWeekly / count).toFixed(2),
            time: this.getDateFormat(previousDate),
          });
          const { muscleRate, weight, fatRate } = currentValue;
          result.computed = {
            muscleRateWeekly: parseFloat(muscleRate),
            fatRateWeekly: parseFloat(fatRate),
            weightWeekly: parseFloat(weight),
            count: 1,
          };
        }

        return result;
      },
      {
        fitWeeklyData: [] as FitWeelkyData[],
        computed: {
          muscleRateWeekly: 0,
          fatRateWeekly: 0,
          weightWeekly: 0,
          count: 1,
        },
      }
    );
    return fitWeeklyData;
  }
  getDataForTime(timeToFind: Date) {
    return this.rawData.find(({ time }) => {
      const dataTime = new Date(time);
      return isSameDay(dataTime, timeToFind);
    });
  }

  roundTo2decimals(number: number) {
    return Math.round(number * 100) / 100;
  }

  getMostRecentDate(): Date {
    const lastEntry = this.rawData[this.rawData.length - 1];
    return new Date(lastEntry.time);
  }

  getDateFormat(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }
}
