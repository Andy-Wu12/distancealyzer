import { httpGetGeocodedLocation } from "./requests";

import type { Coord } from "./useCalculator";

function useGeocoder() {
  async function getCoordinatesOfAddress(address: string): Promise<Coord | null> {
    const locationData = await httpGetGeocodedLocation(address);

    if(locationData) {
      return { x: locationData.lon, y: locationData.lat };
    }

    return null;
  }

  return {
    getCoordinatesOfAddress
  }
}

export default useGeocoder;
