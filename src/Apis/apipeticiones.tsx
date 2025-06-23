
type PeticionResponse = {
    data: any,
    resp: number
  }

import { APIBASE } from "./config";
import useLocalStorage from '../hooks/useLocalStorage';

const API_KEY = import.meta.env.VITE_API_KEY;
export function useGenerarPeticion() {
  const [_, __, obtenerDatos] = useLocalStorage('datasesion');

  async function generarpeticion(endpoint: string, metodo: string, bodyoptions: any): Promise<PeticionResponse> {
    let data = {};
    let resp = 0;
    
    const datasesion = obtenerDatos() as string
    console.log(datasesion)
  
    let requestOptions: RequestInit;
  
    if (metodo.toUpperCase() === "GET") {
      
      requestOptions = {
        method: "GET",
        headers: {
          "X-API-Key":API_KEY,
        },
      };
    } else {
      const formData = new FormData();
  
   
      for (const key in bodyoptions) {
          const value = bodyoptions[key];
  
          if (key === "Logo") {
              // 👇 Caso 1: es un archivo nuevo
              if (value instanceof File) {
              formData.append("Logo", value, value.name);
              }
              // 👇 Caso 2: es una URL (string que comienza con http o ruta relativa)
              else if (typeof value === "string") {
              formData.append("Logo", value);
              }
              // 👇 Omitir si es null o undefined
          } else if (value instanceof File) {
              formData.append(key, value, value.name);
          } else if (typeof value === "object" && value !== null) {
              formData.append(key, JSON.stringify(value));
          } else if (value !== undefined && value !== null) {
              formData.append(key, value);
          }
          }
      
      // Para depurar:
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      
      
      requestOptions = {
        method: metodo.toUpperCase(),
        headers: {
          "X-API-Session": datasesion,
          // NO pongas 'Content-Type' aquí
        },
        body: formData,
      };
    }
  
    const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions);
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }
    resp = response.status;
  
    return { data, resp };
}
return generarpeticion;
}

