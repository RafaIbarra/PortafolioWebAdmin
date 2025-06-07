type PeticionResponse = {
    data: any,
    resp: number
  }

import { APIBASE } from "./config";
async function Generarpeticion(endpoint: string,metodo: string,bodyoptions: object): Promise<PeticionResponse>{
    let data={}
    let resp=0
    
    let requestOptions = {};

    
    if (metodo.toUpperCase()==='GET'){
        requestOptions = {
            method: metodo.toUpperCase(),
            headers: {
                        'API-KEY':'Z2VyZXNhYXBpcHJveWVjdG8wMDE=',
                    }
            }

    } else{
        requestOptions = {
            method: metodo.toUpperCase(),
            headers: {  'Content-Type': 'application/json',
                        
                       'API-KEY':'Z2VyZXNhYXBpcHJveWVjdG8wMDE=',
                    },
            body: JSON.stringify(bodyoptions)
            }
    }
    

    const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions);  
    
    data= await response.json();
    
    resp= response.status;
    
    return { data, resp };
}

export default Generarpeticion