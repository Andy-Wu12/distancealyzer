import { Coord } from "./useCalculator";

async function httpGetGeocodedLocation(uriEncodedAddress: string): Promise<Coord | null> {
  const response = await fetch(`${process.env.REACT_APP_MAPS_API_URL}?q=${uriEncodedAddress}`);
  const data = await response.json();

  if(data.length > 0) {
    console.log(data);
    return data[0];
  }

  return null;
};

export {
  httpGetGeocodedLocation
}