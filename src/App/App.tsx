import { Routes, Route } from 'react-router-dom'

import Home from '../Home/Home'
import InicioSesion from '../InicioSesion/InicioSesion'
// import Socios from '../Socios/Socios'
import LayoutPage from '../LayoutPage/LayoutPage'
import Registro from '../Registro/Registro'
import DataRepositorios from '../DataRepositorios/DataRepositorios'
import { UserProvider } from '../context/UserContext'

const App = () => {
  
  return (
    <UserProvider>

      <Routes>
        
        <Route element={<LayoutPage />}>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Repositorios" element={<DataRepositorios />} />
          
          
          
        </Route>
      </Routes>
    </UserProvider>

 
  )
}

export default App