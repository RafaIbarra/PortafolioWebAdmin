type PeticionResponse = {
    data: any,
    resp: number
  }

import { APIBASE } from "./config";
const API_KEY = import.meta.env.VITE_API_KEY;
// async function Generarpeticion(endpoint: string,metodo: string,bodyoptions: any): Promise<PeticionResponse>{
//     let data={}
//     let resp=0
    
//     let requestOptions = {};

    
//     if (metodo.toUpperCase()==='GET'){
//         requestOptions = {
//             method: metodo.toUpperCase(),
//             headers: {
//                         'API-KEY':'Z2VyZXNhYXBpcHJveWVjdG8wMDE=',
//                     }
//             }

//     } else{
//         // requestOptions = {
//         //     method: metodo.toUpperCase(),
//         //     headers: {  'Content-Type': 'application/json',
                        
//         //                'API-KEY':'Z2VyZXNhYXBpcHJveWVjdG8wMDE=',
//         //             },
//         //     body: JSON.stringify(bodyoptions)
//         //     }
//             let body: BodyInit;
//             const formData = new FormData();
//             console.log('bodyoptions')
//             console.log(bodyoptions)
//             for (const key in bodyoptions) {
//                 console.log('entra')
//                 const value = bodyoptions[key];
//                 console.log('value',value)
//                 if (Array.isArray(value)) {
//                 value.forEach((item, index) => {
//                     if (typeof item === "object") {
//                     for (const subKey in item) {
//                         formData.append(`${key}[${index}].${subKey}`, item[subKey]);
//                     }
//                     } else {
//                     formData.append(`${key}[${index}]`, item);
//                     }
//                 });
//                 } else {
//                 formData.append(key, value);
//                 }
//             }
//             console.log('al terminar')
//             console.log(formData)
            
//             body = formData;
//             console.log('el body')
//             console.log(body)
//             requestOptions = {
//             method: metodo.toUpperCase(),
//             headers: { 'Content-Type': 'multipart/form-data'
                        
                       
//                     },
//             body,
//             };
//             }
    

//     const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions);  
    
//     data= await response.json();
    
//     resp= response.status;
    
//     return { data, resp };
// }

// export default Generarpeticion

async function Generarpeticion(endpoint: string, metodo: string, bodyoptions: any): Promise<PeticionResponse> {
  let data = {};
  let resp = 0;

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

    // for (const key in bodyoptions) {
    //  const value = bodyoptions[key];

    //     if (key === "Logo" && value?.originFileObj instanceof File) {
    //         formData.append("Logo", value.originFileObj, value.originFileObj.name);
    //     } else if (Array.isArray(value)) {
    //         value.forEach((item, index) => {
    //         if (typeof item === "object") {
    //             for (const subKey in item) {
    //             formData.append(`${key}[${index}].${subKey}`, item[subKey]);
    //             }
    //         } else {
    //             formData.append(`${key}[${index}]`, item);
    //         }
    //         });
    //     } else {
    //         formData.append(key, value);
    //     }
    // }

    // for (const key in bodyoptions) {
    //     const value = bodyoptions[key];

    //     if (key === "Logo" && value?.originFileObj instanceof File) {
    //         formData.append("Logo", value.originFileObj, value.originFileObj.name);
    //     } else if (typeof value === "object") {
    //         // Para objetos (incluyendo arrays), enviamos como JSON string
    //         formData.append(key, JSON.stringify(value));
    //     } else {
    //         formData.append(key, value);
    //     }
    //     }
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
        "X-API-Key": API_KEY,
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
export default Generarpeticion
