type PeticionResponse = {
    data: any,
    resp: number
  }

import { APIBASE } from "./config";



async function InicioSesionApi( password: any): Promise<PeticionResponse> {
 let data={}
    let resp=0
    
    const endpoint='InicioSesion'
    const formData = new FormData();
    formData.append('password', password)
    

    const requestOptions = {
        method: 'POST',
        body: formData,
        }

    const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions);  
    data= await response.json();
    resp= response.status;
    
    
    return { data, resp };
}
export default InicioSesionApi
