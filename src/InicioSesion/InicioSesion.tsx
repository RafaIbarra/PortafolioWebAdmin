import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Descriptions, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '../Componentes/Loading';
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
    const generarComprobacion = usePeticionComprobacion();
    const [messageApi, contextHolder] = message.useMessage();
    const [__datasesion, setDatasesion] = useLocalStorage<String>('datasesion', '');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const error = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
    };


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const pass = values.password
        const datos = await InicioSesionApi(pass)
        if (datos.resp === 401) {
            error(datos.data.detail)
        } else {
            const DataSesion_value = datos.data.DataSesion
            setDatasesion(DataSesion_value)
            navigate('/Home')
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 4000));

            const result = await generarComprobacion();
            if (result.resp === 200) {
                setLoading(false);
                navigate('/Home')
                //setDatasistemas(result.data)
            }

            setLoading(false);
        };
        cargarDatos()

    }, []);

    return (
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
            {loading ? (<Loading fullscreen />) : (
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