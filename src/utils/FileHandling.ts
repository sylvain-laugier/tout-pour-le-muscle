import { FitData } from './types';
import { isSameDay } from 'date-fns';

function csvToObj(csv: string) {
  var lines = csv.split('\n');

  var result = [];

  var headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    var obj: any = {};
    var currentline = lines[i].split(',');

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    if (obj.time) {
      result.push(obj);
    }
  }

  return result; //JavaScript object
}
const csvHeader =
  'time,weight,height,bmi,fatRate,bodyWaterRate,boneMass,metabolism,muscleRate,visceralFat';
const dataCorrection = [
  '2022-01-23 08:33:36+0000,78.15,191.0,21.4,18.571095,55.86023,3.2434754,1626.0,60.393215,9.0',
  '2022-04-06 05:38:36+0000,81.0,191.0,22.2,19.60,null,null,null,61.3,null',
  '2022-04-12 05:27:57+0000,81.05,191.0,22.2,20.14,null,null,null,61.49,null',
];

export const fileToObject = async (csv: File): Promise<FitData[]> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsText(csv);
      reader.onload = () => {
        if (reader.result) {
          const importedData = csvToObj(reader.result as string);
          const correctedData = csvToObj(
            [csvHeader, ...dataCorrection].join('\r\n')
          );
          for (const correctedDatum of correctedData) {
            for (let i = 0; i < importedData.length; i += 1) {
              const importedDatum = importedData[i];
              if (
                isSameDay(
                  new Date(importedDatum.time),
                  new Date(correctedDatum.time)
                )
              ) {
                importedData[i] = correctedDatum;
              }
            }
          }
          resolve(importedData);
        }
      };
    } catch (error) {
      reject(error);
    }
  });
};
