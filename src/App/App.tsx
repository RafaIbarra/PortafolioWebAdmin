import {useEffect} from 'react'
import { Routes, Route,useNavigate } from 'react-router-dom'

import { usePeticionComprobacion } from '../Apis/apicomprobarsesion'
import Home from '../Home/Home'
import InicioSesion from '../InicioSesion/InicioSesion'
import LayoutPage from '../LayoutPage/LayoutPage'
import Registro from '../Registro/Registro'
import DataRepositorios from '../DataRepositorios/DataRepositorios'
import CerrandoSesion from '../Componentes/CerrandoSesion'
import { UserProvider } from '../context/UserContext'

const App = () => {
   const generarcomprobacion = usePeticionComprobacion();
   const navigate=useNavigate()
  useEffect(() => {
      
              
              
          const cargardatos = async () => {
            
            
            const result = await generarcomprobacion();
            
            if (result.resp === 200) {
                
                navigate('/Home')
            
                
            } else{
              
              navigate('/CerrandoSesion')
            }
          };
          cargardatos()
          
        }, []);
  return (
    <UserProvider>

      <Routes>
        
        <Route element={<LayoutPage />}>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Repositorios" element={<DataRepositorios />} />
          <Route path="/CerrandoSesion" element={<CerrandoSesion />} />
          
          
          
        </Route>
      </Routes>
    </UserProvider>

 
  )
}

export default App