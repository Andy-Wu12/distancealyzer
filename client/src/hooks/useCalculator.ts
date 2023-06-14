
type Coord = {
  x: number, // longitude
  y: number // latitude
}

function useDistanceCalculator() {

  function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // TODO: Add error handling. Expected, but not guaranteed input format is 40.730610,-73.935242
  function parseCoordinate(point: string): Coord {

    return { x: 0, y: 0 };
  }

  // Reference: https://community.esri.com/t5/coordinate-reference-systems-blog/distance-on-a-sphere-the-haversine-formula/ba-p/902128
  function getDistanceWithHaversine(pointA: Coord, pointB: Coord): number {
    const [lon1, lat1] = [pointA.x, pointA.y];
    const [lon2, lat2] = [pointB.x, pointB.y];

    const earthRadius = 6371000;

    const phi1 = degreesToRadians(lat1);
    const phi2 = degreesToRadians(lat2);

    const deltaPhi = degreesToRadians(lat2 - lat1);
    const deltaLambda = degreesToRadians(lon2 - lon1);

    const a = Math.sin(deltaPhi / 2.0) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2.0) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const meters = earthRadius * c; // Distance in meters
    
    const km = meters / 1000.0;

    return km;
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