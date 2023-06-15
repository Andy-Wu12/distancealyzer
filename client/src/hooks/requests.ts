
async function httpGetGeocodedLocation(uriEncodedAddress: string): Promise<any> {
  const response = await fetch(`${process.env.REACT_APP_MAPS_API_URL}?q=${uriEncodedAddress}`);
  const data = await response.json();

  if(data.length > 0) {
    return data[0];
  }

  return null;
};

export {
  httpGetGeocodedLocation
}