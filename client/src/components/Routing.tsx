import { Routes, Route } from 'react-router-dom';

import Error404 from '../routes/404';
import Landing from '../routes/Landing';
import DistanceCalculator from '../routes/Calculator';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
        {/* Nest valid subroutes here under / */}
        <Route path="/calc" element={<DistanceCalculator />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default Routing;