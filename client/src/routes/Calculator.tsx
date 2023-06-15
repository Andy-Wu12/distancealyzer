import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import ThrottledFetchButton from "../components/ThrottledFetchButton";
import Geocoder from "../components/Geocoder";

import useDistanceCalculator from "../hooks/useCalculator";

import type { Coord } from "../hooks/useCalculator";
import { roundToNDecimalPlaces } from "../util";

type LocationInput = HTMLTextAreaElement | HTMLInputElement;

export default function DistanceCalculator() {
  return (
    <>
      <DistanceCalculatorForm /> <hr/>
      <Geocoder />
    </>
  )
}

function DistanceCalculatorForm() {
  const defaultPointA = '40.730610,-73.935242';
  const defaultPointB = '36.778259,-119.417931';

  const [pointA, setPointA] = useState(defaultPointA);
  const [pointB, setPointB] = useState(defaultPointB);
  
  const [haversineDist, setHaversineDist] = useState<number | null>(null);

  // const [isDisabled, setDisabled] = useState(false);

  const {
    parseCoordinate,
    getDistanceWithHaversine,
    // getDistanceWithEuclidean
  } = useDistanceCalculator();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const coord1: Coord | null = parseCoordinate(pointA);
    const coord2: Coord | null = parseCoordinate(pointB);

    if(coord1 && coord2) {
      const haversineResult = getDistanceWithHaversine(coord1, coord2);
      // Round to two decimal places as per specifications
      setHaversineDist(roundToNDecimalPlaces(haversineResult, 2));
    }
  }

  // TODO: Add debounce to prevent modifying state on every single update
  function onPointChange(e: React.ChangeEvent<LocationInput>, setter: React.Dispatch<React.SetStateAction<string>>) {
    setter(e.target.value);
  }

  return (
    <>
      <h1>Distance Calculator</h1>
      <p>Enter the latitude and longitude values of the two points below</p>
      <p>Click "CALCULATE" once you are ready</p>

      <div className='queryForm'>
        <form onSubmit={onSubmit} id="distanceQueryForm">
          <div id="point-a-input">
            <InputLabel id="point-a-input-label"> Point A </InputLabel>
            <TextField 
              required id="filled-basic" 
              label="latitude,longitude" 
              defaultValue={defaultPointA} 
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
              defaultValue={defaultPointB} 
              variant="filled" 
              onChange={(event) => { onPointChange(event, setPointB) }}
            />
          </div>
          <br/>
          {/* Use isDisabled based on fetch status */}
          <ThrottledFetchButton type="submit" text="Calculate" isDisabled={false} />
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
      <p style={{fontWeight : "bolder"}}>
        Distance: {distance}{unit}
      </p>
    </>
  );
}
