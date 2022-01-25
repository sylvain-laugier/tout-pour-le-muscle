import { FitData } from './types';

function csvToObj(csv: string){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length ;i++){

	  var obj: any = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
    if (obj.time) {
      result.push(obj);
    }


  }
  
  return result; //JavaScript object

}

export const fileToObject = async (csv: File): Promise<FitData[]> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsText(csv);
      reader.onload = () => {

        if (reader.result) {
          const obj = csvToObj(reader.result as string);
          resolve(obj);
        }
      };
    } catch (error) {
      reject(error);
    }
  });
};