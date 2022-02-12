import { isSameDay } from 'date-fns';
import subDays from 'date-fns/subDays';
import { FitData, FitDataKeys, FitData7Days } from './types';

type FitDataExtended = FitData & FitData7Days;
export class FitDataService {
  public fitData: FitDataExtended[];
  private rawData: FitData[];

  constructor(fitData: FitData[]) {
    this.rawData = fitData;
    this.fitData = this.prepareFitData(fitData);

  }

  getDomainRange(key: FitDataKeys): [number, number] {
    const min = Math.floor(Math.min(...this.fitData.map(data => parseFloat(data[key])))* 2) /2;
    const max = Math.ceil(Math.max(...this.fitData.map(data => parseFloat(data[key])) )* 2) / 2;
    
    return [min, max]
  }

  prepareFitData(fitData: FitData[]): FitDataExtended[]  {

    const rangeArray = Array.from(Array(7).keys())

     return fitData.map((fitDatum) => {
      const date = new Date(fitDatum.time);

      const {weight7day, fatRate7day, muscleRate7day} = rangeArray.reduce((result, currentValue) => {
        const foundDate = subDays(date, currentValue);
        const foundData = this.getDataForTime(foundDate)

        if (foundData) {
          return {
            weight7day: result.weight7day + (parseFloat(foundData.weight) - result.weight7day) / result.count,
            fatRate7day: result.fatRate7day + (parseFloat(foundData.fatRate) - result.fatRate7day) / result.count,
            muscleRate7day: result.muscleRate7day + (parseFloat(foundData.muscleRate) - result.muscleRate7day) / result.count,
            count: result.count + 1,
          }

        }
        return result;
      },    { weight7day: 0,fatRate7day: 0, muscleRate7day: 0 , count: 1 })

      return {
        ...fitDatum,
        fatRate: parseFloat(fitDatum.fatRate).toFixed(2),
        muscleRate: parseFloat(fitDatum.muscleRate).toFixed(2),
        time: `${date.getDate()}/${date.getMonth() + 1}`,
        weight7day: this.roundTo2decimals(weight7day),
        fatRate7day:this.roundTo2decimals(fatRate7day),
        muscleRate7day: this.roundTo2decimals(muscleRate7day)
      }
      })
  }

  getDataForTime(timeToFind: Date) {
    return this.rawData.find(({time}) => {
      const dataTime = new Date(time)
      return isSameDay(dataTime , timeToFind)
    })
  }

  roundTo2decimals(number: number) {
   return Math.round(number * 100) / 100;
  }

  getMostRecentDate(): Date { 
    const lastEntry = this.rawData[this.rawData.length - 1]
    return new Date(lastEntry.time)
  }


}
