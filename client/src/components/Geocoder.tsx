import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import ThrottledFetchButton from "./ThrottledFetchButton";

export default function Geocoder() {
  return (
    <>
      <p>Don't know the coordinates? Enter an address to find out!</p>
      <GeocoderForm />
    </>
  )
}

function GeocoderForm() {

  function onSubmit() {

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
              onChange={(event) => { }}
            />
          </div> <br/>
          {/* Use isDisabled based on fetch status */}
          <ThrottledFetchButton type="submit" text="Get Coordinates" isDisabled={false} />
        </form>
      </div>
    </>
  );
}
