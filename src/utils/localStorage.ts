import { FitData } from './types'

const LOCAL_STORAGE_KEY = "FIT_DATA";

export const storeFitDataToLocalStorage = (FitData: FitData[]) => {
  const stringified = JSON.stringify(FitData);
  localStorage.setItem(LOCAL_STORAGE_KEY, stringified);
}

export const retrieveFitDataFromLocalStorage = (): null | FitData[] => {
  const fitData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (fitData) {
    return JSON.parse(fitData)

  }
  return null;
}