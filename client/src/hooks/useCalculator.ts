import { useCallback, useState, useEffect } from "react";

type Coord = {
  x: number, // longitude
  y: number // latitude
}

function useDistanceCalculator() {

  // TODO: Add error handling. Expected, but not guaranteed input format is 40.730610,-73.935242
  function parseCoordinate(point: string): Coord {
    return { x: 0, y: 0 };
  }

  function getDistanceWithHaversine(pointA: Coord, pointB: Coord): number {
    return 0;
  }

  function getDistanceWithEuclidean(pointA: Coord, pointB: Coord): number {
    const q1MinusP1 = pointB.x - pointA.x;
    const q2MinusP2 = pointB.y - pointA.y;

    return Math.sqrt(Math.pow(q1MinusP1, 2) + Math.pow(q2MinusP2, 2));
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