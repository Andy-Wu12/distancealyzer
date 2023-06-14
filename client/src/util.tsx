import { round } from 'lodash';

// Functional helpers
export function getRandomIntInRange(rangeEnd: number): number {
    return Math.floor(Math.random() * rangeEnd);
}

export function roundToNDecimalPlaces(number: number, n: number): number {
  return round(number, n);
}

export function throttle(func: () => {}, msDelay: number, timeObj: {id: null | ReturnType<typeof setTimeout>}, cleanUp: () => void): void {
  if(timeObj.id) {
    return;
  }

  func();
  timeObj.id = setTimeout(function() {
    timeObj.id = null;
    cleanUp();
  }, msDelay);
};

