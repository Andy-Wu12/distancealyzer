import { useState } from "react";

import { httpGetGeocodedLocation } from "./requests";

import type { Coord } from "./useCalculator";

function useGeocoder() {
  const [isPendingFetch, setPendingFetch] = useState(false);

  async function getCoordinatesOfAddress(address: string): Promise<Coord | null> {
    setPendingFetch(true);

    const locationData = await httpGetGeocodedLocation(address);
    let result = null;

    if(locationData) {
      result = { x: locationData.lon, y: locationData.lat };
    }

    setPendingFetch(false);
    return result;
  }

  return {
    getCoordinatesOfAddress,
    isPendingFetch
  }
}

export default useGeocoder;
