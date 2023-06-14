import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import ThrottledFetchButton from "../components/ThrottledFetchButton";

import useDistanceCalculator from "../hooks/useCalculator";

import type { Coord } from "../hooks/useCalculator";

type LocationInput = HTMLTextAreaElement | HTMLInputElement;

export default function DistanceCalculator() {
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  
  const [haversineDist, setHaversineDist] = useState<number | null>(null);

  const [isDisabled, setDisabled] = useState(false);

  const {
    parseCoordinate,
    getDistanceWithHaversine,
    getDistanceWithEuclidean
  } = useDistanceCalculator();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const coord1: Coord = parseCoordinate(pointA);
    const coord2: Coord = parseCoordinate(pointB);

    setHaversineDist(getDistanceWithHaversine(coord1, coord2));
  }

  // TODO: Add debounce to prevent modifying state on every single update
  function onPointChange(e: React.ChangeEvent<LocationInput>, setter: React.Dispatch<React.SetStateAction<string>>) {
    console.log(e.target.value);
    setter(e.target.value);
  }

  return (
    <>
      <h1>Distance Calculator</h1>
      <p>Enter the latitude and longitude values of the two points below</p>
      <p>Click submit once you are ready</p>

      <div className='query-form'>
        <form onSubmit={onSubmit} className="distanceQueryForm">
          <div id="point-a-input">
            <InputLabel id="point-a-input-label"> Point A </InputLabel>
            <TextField 
              required id="filled-basic" 
              label="latitude,longitude" 
              defaultValue="40.730610,-73.935242" 
              variant="filled" 
              onChange={(event) => { onPointChange(event, setPointA) }}
            />
          </div>
          <br/>
          <div id="point-b-input">
            <InputLabel id="point-b-input-label"> Point B </InputLabel>
            <TextField 
              required id="filled-basic" 
              label="latitude,longitude" 
              defaultValue="36.778259,-119.417931" 
              variant="filled" 
              onChange={(event) => { onPointChange(event, setPointB) }}
            />
          </div>
          <br/>
          <ThrottledFetchButton type="submit" text="Calculate" isDisabled={isDisabled} />
        </form>
      </div> <br/>

      {haversineDist !== null && <DistanceOutput distance={haversineDist} unit="km" />}
    </>
  );
}

interface IDistanceOutputProps {
  distance: number,
  unit: string
}

function DistanceOutput({distance, unit}: IDistanceOutputProps) {
  return (
    <>
      <p>
        Distance: {distance}{unit}
      </p> 
    </>
  );
}
