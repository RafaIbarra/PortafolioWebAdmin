import { Routes, Route } from 'react-router-dom'

import Home from '../Home/Home'
// import Socios from '../Socios/Socios'
import LayoutPage from '../LayoutPage/LayoutPage'

const App = () => {
  return (
    <Routes>
      
      <Route element={<LayoutPage />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Socios" element={<Socios />} /> */}
        
        
      </Route>
    </Routes>
  )
}

export default App