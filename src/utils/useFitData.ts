import { FitDataService } from './dataHandling';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fileToObject } from './FileHandling';
import { retrieveFitDataFromLocalStorage, storeFitDataToLocalStorage } from './localStorage';
import { FitData } from './types';

export function useFitData(): [FitDataService | undefined, (file: File) => void] {
  const [fitData, setFitData] = useState<FitData[]>();
  const [fitDataService, setFitDataService] = useState<FitDataService>();
  useEffect(() => {

    if (fitData) {
      const service = new FitDataService(fitData)
      setFitDataService(service)

    }
  }, [fitData])

  useEffect(() => {
    const fitDataFromLocalStorage = retrieveFitDataFromLocalStorage();
    if (fitDataFromLocalStorage) {
      setFitData(fitDataFromLocalStorage);
    }
  }, []);

  const setFileToFitData = useCallback((file) => {
    const asynFunction = async () => {
      const result = await fileToObject(file as File);
      setFitData(result);
      storeFitDataToLocalStorage(result);
      const service = new FitDataService(result)
      setFitDataService(service)
    };
    asynFunction();
  }, []);

  return [fitDataService, setFileToFitData]

}