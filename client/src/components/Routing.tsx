import { Routes, Route } from 'react-router-dom';

import Error404 from '../routes/404';
import Landing from '../routes/Landing';


export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
        {/* Nest valid subroutes here under / */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default Routing;