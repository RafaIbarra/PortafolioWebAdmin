import React,{useEffect,useState,useContext} from 'react'
import { Button,  Form, Input,Descriptions,message,Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { SyncOutlined } from '@ant-design/icons';
import InicioSesionApi from '../Apis/apiiniciosesion';
import { usePeticionComprobacion } from '../Apis/apicomprobarsesion';
import useLocalStorage from '../hooks/useLocalStorage';
import type { FormProps } from 'antd';
type FieldType = {

  password?: string;
  
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const InicioSesion: React.FC = () => {
    const generarcomprobacion = usePeticionComprobacion();
    const [messageApi, contextHolder] = message.useMessage();
    const [datasesion, setDatasesion] = useLocalStorage<String>('datasesion', '');
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()
    const error = (msg:any) => {
        messageApi.open({
        type: 'error',
        content:`${msg}`,
         className: 'custom-class',
        style: {
            marginTop: '20vh',
        },
        });
    };

    const customIcon = (
    
        <SyncOutlined style={{ fontSize: 48, color: "rgba(32,93,93,255)" }} spin />

        );
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log(values.password);
        const pass=values.password
        const datos = await InicioSesionApi(pass)
        if (datos.resp===401){
            error(datos.data.detail)
        }else{

            
            const DataSesion_value=datos.data.DataSesion
            setDatasesion(DataSesion_value)
            navigate('/Home')
        }

        };

    useEffect(() => {
    
            
            
        const cargardatos = async () => {
           setLoading(true); 
           
              
            await new Promise(resolve => setTimeout(resolve, 4000));
            
            const result = await generarcomprobacion();
            console.log('result: ',result)
            if (result.resp === 200) {
                setLoading(false); 
                navigate('/Home')
            //setDatasistemas(result.data)
                
            }
           
           setLoading(false);
        };
        cargardatos()
        
      }, []);

    return(
        <div style={{
            margin: '0 auto',        // Centrado horizontal
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centrado vertical
            minHeight: '100%',
            width: '100%',
            maxWidth: 600,           // Mismo ancho que el Form
            
            padding: 24              // Espaciado interno
        }}>

            {contextHolder}
            {loading ? (
                        <Spin indicator={customIcon} fullscreen />
                      ) : (
                        <>
                    <Descriptions title="INGRESO AL SISTEMA" />
                    <Form
                        
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            

                            <Form.Item<FieldType>
                            label="Contraseña"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                            <Input.Password />
                            </Form.Item>

                            
                            <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                INGRESAR
                            </Button>
                            </Form.Item>
                    </Form>
                        </>

                      )
            }
        </div>
    )

}

 export default InicioSesion