import React,{useEffect,useState,useCallback } from 'react'
import {Form,Input, Upload, Row, Col,Tabs,Select,Button,Space    } from 'antd';
import { PlusOutlined,MinusCircleOutlined,DownloadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd'; // Importación correcta para tipos
const { TextArea } = Input;
const { Option } = Select;
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type SizeType = Parameters<typeof Form>[0]['size'];


interface DetalleBackend {
  Repositorio: string;
  Framework: string;
  Lenguaje: string;
  BaseDatos: string;
  Alojamiento: string;
  SO: string;
  Urls: string;
  ServidorWeb: string;
}
interface DetalleFronted {
  Repositorio: string;
  Framework: string;
  Lenguaje: string;
  Alojamiento: string;
  SO: string;
  Urls: string;
  ServidorWeb: string;
}
interface DetalleMovil {
  Repositorio: string;
  Framework: string;
  Lenguaje: string;
  VersionAndroid: string;
  VersioniOS: string;
  EnlaceDescarga: string;
  
}
interface ProyectoData {
  id: number;
  Sistema: string;
  Descripcion: string;
  Logo: UploadFile | null;
  detalle_backend: DetalleBackend;
  detalle_frontend:DetalleFronted;
  detalle_movil:DetalleMovil
}

interface FormBackendProps {
  detalle_backend: DetalleBackend;
  onUpdate: (campo: keyof DetalleBackend, valor: string) => void;
}

// 3. Componente FormBackend (puede estar en el mismo archivo o separado)
const FormBackend: React.FC<FormBackendProps> = ({ detalle_backend, onUpdate }) => {
    const [componentSize, setComponentSize] = useState('small')
    return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                size={componentSize as SizeType}
                style={{ width: '100%', maxWidth: 800 }}
            >
                
                <Form.Item label="Repositorio">
                    <Input  
                    value={detalle_backend.Repositorio}
                    onChange={(e) => onUpdate('Repositorio', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
                
                <Form.Item label="Framework">
                    <Input
                        value={detalle_backend.Framework}
                        onChange={(e) => onUpdate('Framework', e.target.value)}
                    />
                    </Form.Item>
            
                <Form.Item label="Lenguaje">
                    <Input 
                    value={detalle_backend.Lenguaje}
                    onChange={(e) => onUpdate('Lenguaje', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Base Datos">
                    <Input 
                    value={detalle_backend.BaseDatos}
                    onChange={(e) => onUpdate('BaseDatos', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Alojamiento">
                    <Input 
                    value={detalle_backend.Alojamiento}
                    onChange={(e) => onUpdate('Alojamiento', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="S.O.">
                    <Input 
                    value={detalle_backend.SO}
                    onChange={(e) => onUpdate('SO', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Urls">
                    <Input  
                    value={detalle_backend.Urls}
                    onChange={(e) => onUpdate('Urls', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
            
                <Form.Item label="Servidor Web">
                    <Input 
                    value={detalle_backend.ServidorWeb}
                    onChange={(e) => onUpdate('ServidorWeb', e.target.value)}
                    />
                </Form.Item>
                
            </Form>
        </div>
  );
};

interface FormFrontedProps {
  detalle_frontend: DetalleFronted;
  onUpdate: (campo: keyof DetalleFronted, valor: string) => void;
}

const FormFrontend: React.FC<FormFrontedProps> = ({ detalle_frontend, onUpdate }) => {
    const [componentSize, setComponentSize] = useState('small')
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                size={componentSize as SizeType}
                style={{ width: '100%', maxWidth: 800 }}
            >
                
                <Form.Item label="Repositorio">
                    <Input  
                    value={detalle_frontend.Repositorio}
                    onChange={(e) => onUpdate('Repositorio', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
                
                <Form.Item label="Framework">
                    <Input
                        value={detalle_frontend.Framework}
                        onChange={(e) => onUpdate('Framework', e.target.value)}
                    />
                    </Form.Item>
            
                <Form.Item label="Lenguaje">
                    <Input 
                    value={detalle_frontend.Lenguaje}
                    onChange={(e) => onUpdate('Lenguaje', e.target.value)}
                    />
                </Form.Item>
            
                
            
                <Form.Item label="Alojamiento">
                    <Input 
                    value={detalle_frontend.Alojamiento}
                    onChange={(e) => onUpdate('Alojamiento', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="S.O.">
                    <Input 
                    value={detalle_frontend.SO}
                    onChange={(e) => onUpdate('SO', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Urls">
                    <Input  
                    value={detalle_frontend.Urls}
                    onChange={(e) => onUpdate('Urls', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
            
                <Form.Item label="Servidor Web">
                    <Input 
                    value={detalle_frontend.ServidorWeb}
                    onChange={(e) => onUpdate('ServidorWeb', e.target.value)}
                    />
                </Form.Item>
                
            </Form>
        </div>
  );
};

interface FormMovilProps {
  detalle_movil: DetalleMovil;
  onUpdate: (campo: keyof DetalleMovil, valor: string) => void;
}
const FormMovil: React.FC<FormMovilProps> = ({ detalle_movil, onUpdate }) => {
    const [componentSize, setComponentSize] = useState('small')
    return( 
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                size={componentSize as SizeType}
                style={{ width: '100%', maxWidth: 800 }}
            >
                
                <Form.Item label="Repositorio">
                    <Input  
                    value={detalle_movil.Repositorio}
                    onChange={(e) => onUpdate('Repositorio', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
                <Form.Item label="Framework">
                    <Input 
                    value={detalle_movil.Framework}
                    onChange={(e) => onUpdate('Framework', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Lenguaje">
                    <Input 
                    value={detalle_movil.Lenguaje}
                    onChange={(e) => onUpdate('Lenguaje', e.target.value)}
                    />
                </Form.Item>
                
                <Form.Item name="VersionAndroid" label="Version Android">
                    <Select
                        value={detalle_movil.VersionAndroid}  // Asegúrate que este campo existe en tu estado
                        onChange={(value) => onUpdate('VersionAndroid', value)}
                        allowClear
                    >
                        <Option value="SI">SI</Option>
                        <Option value="NO">NO</Option>
                    </Select>
                </Form.Item>
            
                <Form.Item name="VersioniOS" label="Version iOS">
                    <Select
                        value={detalle_movil.VersioniOS}  // Asegúrate que este campo existe en tu estado
                        onChange={(value) => onUpdate('VersioniOS', value)}
                        allowClear
                    >
                        <Option value="SI">SI</Option>
                        <Option value="NO">NO</Option>
                    </Select>
                </Form.Item>
            
                <Form.Item label="EnlaceDescarga">
                    <Input  
                    value={detalle_movil.EnlaceDescarga}
                    onChange={(e) => onUpdate('EnlaceDescarga', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
            
            </Form>
        </div>
        );
    };

const Registro: React.FC = () => {
    const [componentSize, setComponentSize] = useState('small')
    
    const [proyectodata, setProyectodata] = useState<ProyectoData>({
        id: 0,
        Sistema: '',
        Descripcion: '',
        Logo: null,
        detalle_backend: {
            Repositorio: '',
            Framework: '',
            Lenguaje: '',
            BaseDatos: '',
            Alojamiento: '',
            SO: '',
            Urls: '',
            ServidorWeb: ''
        },
        detalle_frontend: {
            Repositorio: '',
            Framework: '',
            Lenguaje: '',
            Alojamiento: '',
            SO: '',
            Urls: '',
            ServidorWeb: ''
        },
        detalle_movil: {
            Repositorio: '',
            Framework: '',
            Lenguaje: '',
            VersionAndroid: '',
            VersioniOS: '',
            EnlaceDescarga: ''
            
        }
        });

    

    const onFinish = (values: any) => {
            console.log('Received values of form:', values);
    };


    const handleImageChange = (info: any) => {
        if (info.file.status === 'removed') {
            // Si se elimina la imagen, resetear el estado
            setProyectodata(prev => ({
            ...prev,
            Logo: null,
            }));
        } else {
            // Tomar el último archivo seleccionado (limitado a 1)
            const fileList = info.fileList.slice(-1);
            if (fileList.length > 0) {
            setProyectodata(prev => ({
                ...prev,
                Logo: fileList[0],
            }));
            }
        }
        };
    
    const actualizar_data = (campo: string, valor: string) => {
        setProyectodata((prev) => ({
            ...prev,
            [campo]: valor,
        }));
        };

    const actualizar_detalle_backend = useCallback(
        (campo: keyof DetalleBackend, valor: string) => {
        setProyectodata(prev => ({
            ...prev,
            detalle_backend: {
            ...prev.detalle_backend,
            [campo]: valor
            }
        }));
        },
        []
    );
    const actualizar_detalle_fronted = useCallback(
        (campo: keyof DetalleFronted, valor: string) => {
        setProyectodata(prev => ({
            ...prev,
            detalle_frontend: {
            ...prev.detalle_frontend,
            [campo]: valor
            }
        }));
        },
        []
    );

    const actualizar_detalle_movil = useCallback(
        (campo: keyof DetalleMovil, valor: string) => {
        setProyectodata(prev => ({
            ...prev,
            detalle_movil: {
            ...prev.detalle_movil,
            [campo]: valor
            }
        }));
        },
        []
    );
    
   
    
    const FormEtiquetas: React.FC = () => {
    return( 
        <div>
             <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                autoComplete="off"
                >
                <Form.List name="users">
                {(fields, { add, remove }) => (
                    <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                            {...restField}
                            name={[name, 'first']}
                            rules={[{ required: true, message: 'Falta Etiqueta' }]}
                        >
                            <Input placeholder="Nombre Etiqueta" />
                        </Form.Item>
                        
                        <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Agregar Etiqueta
                        </Button>
                    </Form.Item>
                    </>
                )}
                </Form.List>
                <Form.Item>
                
                </Form.Item>
            </Form>
        </div>
        );
    };
    const registrar=()=>{
        console.log(proyectodata)
    }

    return(
        <div >
            
            <Form layout="inline" size={componentSize as SizeType}>
                
                <Row gutter={[16, 16]} style={{ width: '100%', marginBottom: 24  }}>
                    <Col>
                    <Form.Item label="Codigo">
                        <Input disabled />
                    </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item label="Proyecto">
                        <Input style={{ width: '500px' }} 
                        name="Sistema"
                        value={proyectodata.Sistema}
                        onChange={(e) => actualizar_data(e.target.name, e.target.value)}
                        />
                    </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item label="Fecha Registro">
                        <Input disabled />
                    </Form.Item>
                    </Col>
                </Row>

               
                <Row gutter={[16, 16]} style={{ width: '100%' }}>
                    <Col>
                    <Form.Item label="Descripcion">
                        <TextArea style={{ width: '600px' }} rows={4} 
                        name="Descripcion"
                        value={proyectodata.Descripcion}
                         onChange={(e) => actualizar_data('Descripcion', e.target.value)}
                        />
                    </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Logo"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            >
                            <Upload
                                action="/upload.do"
                                listType="picture-card"
                                fileList={proyectodata.Logo ? [proyectodata.Logo] : []}
                                onChange={handleImageChange}
                                beforeUpload={() => false} // Evitar subida automática
                                maxCount={1} // Limitar a 1 archivo
                            >
                                {/* Mostrar botón solo si no hay imagen */}
                                {!proyectodata.Logo && (
                                <button
                                    style={{
                                    color: 'inherit',
                                    cursor: 'inherit',
                                    border: 0,
                                    background: 'none',
                                    }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Seleccionar Logo</div>
                                </button>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Tabs
                //onChange={onChange}
                type="card"
                centered
                size={componentSize as SizeType}
                style={{marginTop:'50px'}}
                tabBarStyle={{width: '100%',display: 'flex',justifyContent: 'space-around'}}
                items={[
                    {
                    //label: 'Backend',
                    label: (<span style={{ display: 'inline-block',width: '100px',textAlign: 'center',boxSizing: 'border-box'}}>Backend</span>),
                    key: '1',
                    children: (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <FormBackend
                                detalle_backend={proyectodata.detalle_backend}
                                onUpdate={actualizar_detalle_backend}
                            />
                        </div>
                    ),
                    },
                    
                    {
                    //label: 'Frontend',
                    label: (<span style={{ display: 'inline-block',width: '100px',textAlign: 'center',boxSizing: 'border-box'}}>Frontend</span>),
                    key: '2',
                    children: (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <FormFrontend
                                detalle_frontend={proyectodata.detalle_frontend}
                                onUpdate={actualizar_detalle_fronted}
                            />
                        </div>
                    )
                    },
                    {
                    //label: 'Móvil',
                    label: (<span style={{ display: 'inline-block',width: '100px',textAlign: 'center',boxSizing: 'border-box'}}>Móvil</span>),
                    key: '3',
                    children: (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <FormMovil
                                detalle_movil={proyectodata.detalle_movil}
                                onUpdate={actualizar_detalle_movil}
                            />
                        </div>
                    )
                    }
                    ,
                    {
                    //label: 'Etiquetas',
                    label: (<span style={{ display: 'inline-block',width: '100px',textAlign: 'center',boxSizing: 'border-box'}}>Etiquetas</span>),
                    key: '4',
                    children:(
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormEtiquetas/>  
                        </div>
                    ) 
                    }
                ]}
                />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button type="primary" icon={<DownloadOutlined />} size="large" onClick={registrar}>
                    REGISTRAR
                </Button>
            </div>
        </div>
    )
}
  export default Registro