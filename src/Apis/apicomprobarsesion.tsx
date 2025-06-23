
type PeticionResponse = {
    data: any,
    resp: number
  }

import { APIBASE } from "./config";
import useLocalStorage from '../hooks/useLocalStorage';


export function usePeticionComprobacion() {
  const [_, __, obtenerDatos] = useLocalStorage('datasesion');

  async function generarcomprobacion(): Promise<PeticionResponse> {
    let data = {};
    let resp = 0;
    
    const datasesion = obtenerDatos() as string
    console.log(datasesion)
    const endpoint='VerificarSesion'
    
    const  requestOptions = {
        method: 'GET',
        headers: {
          "X-API-Session": datasesion,
          // NO pongas 'Content-Type' aquí
        },
        
      };
    
  
    const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions);
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }
    resp = response.status;
  
    return { data, resp };
}
return generarcomprobacion;
}


