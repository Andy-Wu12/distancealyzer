import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import ThrottledFetchButton from "./ThrottledFetchButton";
import CopyTextButton from "./CopyTextButton";

import useGeocoder from "../hooks/useGeocoder";
import { throttle, uriEncodeString } from "../util";

export default function Geocoder() {
  return (
    <>
      <h2>
        Don't know the coordinates? Enter an address to find out!
      </h2>
      <p>
        Just copy and paste the result into one of the inputs above.
      </p>
      <GeocoderForm />
    </>
  )
}

function GeocoderForm() {
  const [address, setAddress] = useState('');
  const [coordinateStr, setCoordinateStr] = useState('');
  const [isThrottled, setThrottled] = useState(false);

  const fetchDelay = 2000;

  const {
    getCoordinatesOfAddress,
    isPendingFetch
  } = useGeocoder();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    throttle(async () => {
      setThrottled(true);
      const coordinate = await getCoordinatesOfAddress(uriEncodeString(address));

      const coordinateStr = coordinate ? `${coordinate.y},${coordinate.x}` : "Nothing found for given address";
      setCoordinateStr(coordinateStr);
    }, fetchDelay, {id: null}, () => { setThrottled(false) });
  }

  return (
    <>
      <div className='queryForm'>
        <form onSubmit={onSubmit} id="GeocodeForm">
          <div id="address-input">
            <InputLabel id="address-input-label"> Address </InputLabel>
            <TextField 
              required id="filled-basic" 
              label="address" 
              defaultValue={""}
              variant="filled"
              onChange={(event) => { setAddress(event.target.value) }}
            />
          </div> <br/>
          {/* Use isDisabled based on fetch status */}
          <ThrottledFetchButton type="submit" text="Get Coordinates" isDisabled={isPendingFetch || isThrottled} />
        </form> <br/>
        <GeocodeOutput coordinateStr={coordinateStr}/>
      </div>
    </>
  );
}

interface IGeocodeOutputProps {
  coordinateStr: string
}

function GeocodeOutput({coordinateStr}: IGeocodeOutputProps) {
  if(coordinateStr.length > 0) {
    return (
      <>
        <p id="geocode-output">{coordinateStr}</p>
        <CopyTextButton elementID="geocode-output" />
      </>
    )
  }

  return (
    <>
    </>
  )
}