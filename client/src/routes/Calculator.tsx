import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import ThrottledFetchButton from "../components/ThrottledFetchButton";

export default function DistanceCalculator() {
  const [isDisabled, setDisabled] = useState(false);

  function onSubmit(e: any) {
    e.preventDefault();
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
            <FormControl>
              <TextField required id="filled-basic" label="latitude,longitude" defaultValue="40.730610,-73.935242" variant="filled" />
            </FormControl>
          </div>
          <br/>
          <div id="point-b-input">
            <InputLabel id="point-b-input-label"> Point B </InputLabel>
            <FormControl>
              <TextField required id="filled-basic" label="latitude,longitude" defaultValue="36.778259,-119.417931" variant="filled" />
            </FormControl>
          </div>
          <br/>
          <ThrottledFetchButton type="submit" text="Submit" isDisabled={isDisabled} />
        </form>
        <br/>

    </div>
    </>
  );
}
