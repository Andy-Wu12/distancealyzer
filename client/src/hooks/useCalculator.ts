import { useCallback, useState, useEffect } from "react";

type Coord = {
  latitude: number,
  longitude: number
}

function useDistanceCalculator() {

  // TODO: Add error handling if there is time. Expected, but not guaranteed input format is 40.730610,-73.935242
  function parseCoordinate(point: string): Coord {
    return { latitude: 0, longitude: 0 };
  }

  function getDistanceWithHaversine(pointA: Coord, pointB: Coord): number {
    return 0;
  }

  function getDistanceWithEuclidean(pointA: Coord, pointB: Coord): number {
    return 0;
  }

  return {
    getDistanceWithEuclidean,
    getDistanceWithHaversine,
    parseCoordinate,
  };
}

export default useDistanceCalculator;

export type {
  Coord,
}