import React,{useEffect,useState,useCallback  } from 'react'
import { useNavigate } from "react-router-dom";
import {Form,Input, Upload, Row, Col,Tabs,Select,Button,Space,Spin,message,Descriptions,FloatButton,Modal  } from 'antd';
import { PlusOutlined,MinusCircleOutlined,DownloadOutlined,SyncOutlined,RollbackOutlined,DeleteOutlined  } from '@ant-design/icons';
import { useGenerarPeticion } from '../Apis/apipeticiones';
import useLocalStorage from '../hooks/useLocalStorage';

import type { UploadFile } from 'antd'; // Importación correcta para tipos
const { TextArea } = Input;
const { Option } = Select;
// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

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
interface DetalleTags {
  Tag: string; 
}
interface ProyectoData {
  id: number;
  Sistema: string;
  Descripcion: string;
  Logo: UploadFile | null;
  detalle_backend: DetalleBackend[];
  detalle_frontend:DetalleFronted[];
  detalle_movil:DetalleMovil[];
  detalle_tags: DetalleTags[];
}

interface FormBackendProps {
  detalle_backend: DetalleBackend[]
  onUpdate: (campo: keyof DetalleBackend, valor: string) => void;
}

// 3. Componente FormBackend (puede estar en el mismo archivo o separado)
const FormBackend: React.FC<FormBackendProps> = ({ detalle_backend, onUpdate }) => {
    const [componentSize] = useState('small')
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
                    value={detalle_backend[0].Repositorio}
                    onChange={(e) => onUpdate('Repositorio', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
                
                <Form.Item label="Framework">
                    <Input
                        value={detalle_backend[0].Framework}
                        onChange={(e) => onUpdate('Framework', e.target.value)}
                    />
                    </Form.Item>
            
                <Form.Item label="Lenguaje">
                    <Input 
                    value={detalle_backend[0].Lenguaje}
                    onChange={(e) => onUpdate('Lenguaje', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Base Datos">
                    <Input 
                    value={detalle_backend[0].BaseDatos}
                    onChange={(e) => onUpdate('BaseDatos', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Alojamiento">
                    <Input 
                    value={detalle_backend[0].Alojamiento}
                    onChange={(e) => onUpdate('Alojamiento', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="S.O.">
                    <Input 
                    value={detalle_backend[0].SO}
                    onChange={(e) => onUpdate('SO', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Urls">
                    <Input  
                    value={detalle_backend[0].Urls}
                    onChange={(e) => onUpdate('Urls', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
            
                <Form.Item label="Servidor Web">
                    <Input 
                    value={detalle_backend[0].ServidorWeb}
                    onChange={(e) => onUpdate('ServidorWeb', e.target.value)}
                    />
                </Form.Item>
                
            </Form>
        </div>
  );
};

interface FormFrontedProps {
  detalle_frontend: DetalleFronted[];
  onUpdate: (campo: keyof DetalleFronted, valor: string) => void;
}

const FormFrontend: React.FC<FormFrontedProps> = ({ detalle_frontend, onUpdate }) => {
    const [componentSize] = useState('small')
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
                    value={detalle_frontend[0].Repositorio}
                    onChange={(e) => onUpdate('Repositorio', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
                
                <Form.Item label="Framework">
                    <Input
                        value={detalle_frontend[0].Framework}
                        onChange={(e) => onUpdate('Framework', e.target.value)}
                    />
                    </Form.Item>
            
                <Form.Item label="Lenguaje">
                    <Input 
                    value={detalle_frontend[0].Lenguaje}
                    onChange={(e) => onUpdate('Lenguaje', e.target.value)}
                    />
                </Form.Item>
            
                
            
                <Form.Item label="Alojamiento">
                    <Input 
                    value={detalle_frontend[0].Alojamiento}
                    onChange={(e) => onUpdate('Alojamiento', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="S.O.">
                    <Input 
                    value={detalle_frontend[0].SO}
                    onChange={(e) => onUpdate('SO', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Urls">
                    <Input  
                    value={detalle_frontend[0].Urls}
                    onChange={(e) => onUpdate('Urls', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
            
                <Form.Item label="Servidor Web">
                    <Input 
                    value={detalle_frontend[0].ServidorWeb}
                    onChange={(e) => onUpdate('ServidorWeb', e.target.value)}
                    />
                </Form.Item>
                
            </Form>
        </div>
  );
};

interface FormMovilProps {
  detalle_movil: DetalleMovil[];
  onUpdate: (campo: keyof DetalleMovil, valor: string) => void;
}
const FormMovil: React.FC<FormMovilProps> = ({ detalle_movil, onUpdate }) => {
    const [componentSize] = useState('small')
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
                    value={detalle_movil[0].Repositorio}
                    onChange={(e) => onUpdate('Repositorio', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
                <Form.Item label="Framework">
                    <Input 
                    value={detalle_movil[0].Framework}
                    onChange={(e) => onUpdate('Framework', e.target.value)}
                    />
                </Form.Item>
            
                <Form.Item label="Lenguaje">
                    <Input 
                    value={detalle_movil[0].Lenguaje}
                    onChange={(e) => onUpdate('Lenguaje', e.target.value)}
                    />
                </Form.Item>
                
                <Form.Item name="VersionAndroid" label="Version Android">
                    <Select
                        value={detalle_movil[0].VersionAndroid}  // Asegúrate que este campo existe en tu estado
                        onChange={(value) => onUpdate('VersionAndroid', value)}
                        allowClear
                    >
                        <Option value="SI">SI</Option>
                        <Option value="NO">NO</Option>
                    </Select>
                </Form.Item>
            
                <Form.Item name="VersioniOS" label="Version iOS">
                    <Select
                        value={detalle_movil[0].VersioniOS}  // Asegúrate que este campo existe en tu estado
                        onChange={(value) => onUpdate('VersioniOS', value)}
                        allowClear
                    >
                        <Option value="SI">SI</Option>
                        <Option value="NO">NO</Option>
                    </Select>
                </Form.Item>
            
                <Form.Item label="EnlaceDescarga">
                    <Input  
                    value={detalle_movil[0].EnlaceDescarga}
                    onChange={(e) => onUpdate('EnlaceDescarga', e.target.value)}
                    addonBefore="https://" 
                    />
                </Form.Item>
            
            
            </Form>
        </div>
        );
    };

interface FormTagsProps {
  detalle_tags: DetalleTags[];
 onUpdate: (tags: DetalleTags[]) => void;
}

const FormsTags: React.FC<FormTagsProps> = ({ detalle_tags, onUpdate }) => {
  const [form] = Form.useForm();

  // Sincronizar el formulario con las props iniciales
  useEffect(() => {
    form.setFieldsValue({
      users: detalle_tags.map(tag => ({ first: tag.Tag }))
    });
  }, [detalle_tags, form]);

  const updateRealTags = () => {
    const values = form.getFieldsValue();
    const realTags = (values.users || [])
      .filter((item: any) => item?.first?.trim())
      .map((item: any) => ({ Tag: item.first.trim() }));
    
    onUpdate(realTags);
  };

  const handleAdd = (add: Function) => {
    add({ first: '' }); // Siempre permite agregar nuevos campos
  };

  const handleRemove = (remove: Function, name: number) => {
    remove(name);
    // Actualizar estado después de eliminar
    const values = form.getFieldsValue();
    const newTags = values.users?.map((item: any) => ({ Tag: item.first || '' })) || [];
    onUpdate(newTags);
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
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
                  <Input 
                    placeholder="Nombre Etiqueta" 
                    // onChange={() => {
                    //   const values = form.getFieldsValue();
                    //   const newTags = values.users.map((item: any) => ({ Tag: item.first || '' }));
                    //   onUpdate(newTags);
                    // }}
                     onBlur={updateRealTags}
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => handleRemove(remove, name)} />
              </Space>
            ))}
            <Form.Item>
              <Button 
                type="dashed" 
               onClick={() => handleAdd(add)} 
                block 
                icon={<PlusOutlined />}
              >
                Agregar Etiqueta
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
 const customIcon = (
    //   <SyncOutlined style={{ fontSize: 48, color: '#2ca9ff' }} spin />
    <SyncOutlined style={{ fontSize: 48, color: "rgba(32,93,93,255)" }} spin />

    );
 

const Registro: React.FC = () => {
    const generarPeticion = useGenerarPeticion();
    const [componentSize] = useState('small')
    const [idProyecto] = useLocalStorage<number>('id_proyecto', 0);
    const [loading, setLoading] = useState(true);
    const [deletequestion,setDeletequestion]=useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [titulo,setTitulo]=useState('')
    const [tituloeliminar,setTituloeliminar]=useState('')
    const [modal, contextHoldermodal] = Modal.useModal();

    const config = {
        title: 'CONFIRMAR',
        content: (
            <>
            <br />
            {tituloeliminar}
            <br />
            <br />
            </>
        ),
        };
    const abrir_modal= async()=>{
         const confirmed = await modal.confirm(config);
         if(confirmed){
            confirm()
         
         }
            
    }
    
    const navigate=useNavigate()
    const [proyectodata, setProyectodata] = useState<ProyectoData>({
        id: idProyecto,
        Sistema: '',
        Descripcion: '',
        Logo: null,
        detalle_backend: [{
            Repositorio: '',
            Framework: '',
            Lenguaje: '',
            BaseDatos: '',
            Alojamiento: '',
            SO: '',
            Urls: '',
            ServidorWeb: ''
        }
    ],
        detalle_frontend: [{
            Repositorio: '',
            Framework: '',
            Lenguaje: '',
            Alojamiento: '',
            SO: '',
            Urls: '',
            ServidorWeb: ''
        }],
        detalle_movil: [{
            Repositorio: '',
            Framework: '',
            Lenguaje: '',
            VersionAndroid: '',
            VersioniOS: '',
            EnlaceDescarga: ''
            
        }],
        detalle_tags: []
        });

    const [fileList, setFileList] = useState<any[]>([]); // ← sin tipado estricto

    const handleImageChange = (info: any) => {
        if (info.file.status === 'removed') {
            setFileList([]);
            setProyectodata((prev) => ({
                ...prev,
                Logo: null,
            }));
            } 
        else {
            const fileListTemp = info.fileList.slice(-1); // Solo 1 archivo

        const updatedList = fileListTemp.map((file: any) => {
            if (!file.url && !file.preview && file.originFileObj) {
            file.url = URL.createObjectURL(file.originFileObj);
            }
            return file;
        });

        setFileList(updatedList);

        if (updatedList.length > 0) {
            setProyectodata((prev) => ({
            ...prev,
            Logo: updatedList[0].originFileObj,
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

    const success = () => {
        messageApi.open({
        type: 'success',
        content: 'Registro correcto',
        className: 'custom-class',
        style: {
            marginTop: '20vh',
        },
        });
    };
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
    const confirm = async () =>
    {
     const endpoint = `EliminarProyecto/${idProyecto}/`;
        const result = await generarPeticion(endpoint, "DELETE", '');
        // console.log(result)
        if (result.resp==200){
           
           atras()
        }
        else{
            error(result.data.detail)
        }
    };
    
    const actualizar_detalle_backend = useCallback(
        (campo: keyof DetalleBackend, valor: string) => {
            setProyectodata(prev => {
            const nuevosBackends = [...prev.detalle_backend];
            nuevosBackends[0] = {
                ...nuevosBackends[0],
                [campo]: valor
            };
            return {
                ...prev,
                detalle_backend: nuevosBackends
            };
            });
        },
        []
    );

    const actualizar_detalle_fronted = useCallback(
        (campo: keyof DetalleFronted, valor: string) => {
            setProyectodata(prev => {
            const nuevosFrontends = [...prev.detalle_frontend];
            nuevosFrontends[0] = {
                ...nuevosFrontends[0],
                [campo]: valor
            };
            return {
                ...prev,
                detalle_frontend: nuevosFrontends
            };
            });
        },
        []
        );

    const actualizar_detalle_movil = useCallback(
        (campo: keyof DetalleMovil, valor: string) => {
            setProyectodata(prev => {
            const nuevosMoviles = [...prev.detalle_movil];
            nuevosMoviles[0] = {
                ...nuevosMoviles[0],
                [campo]: valor
            };
            return {
                ...prev,
                detalle_movil: nuevosMoviles
            };
            });
        },
        []
    );
    
    const actualizar_detalle_tags = useCallback((tags: DetalleTags[]) => {
            setProyectodata(prev => ({
            ...prev,
            detalle_tags: tags
            }));
        }, []);
            
    useEffect(() => {
        const cargardatos = async () => {
            setLoading(true); 
            if (idProyecto>0){
                
                setDeletequestion(true)
                const body = {};
                const endpoint = `ListarProyectos/${idProyecto}/`;
                const result = await generarPeticion(endpoint, "GET", body);
                if (result.resp === 200) {
                const data=result.data
                const textotitulo=`ACTUALIZAR PROYECTO: ${data[0].Sistema}`
                const textotitulodel=`DESEA ELIMINAR PROYECTO: ${data[0].Sistema}?`
                setTitulo(textotitulo)
                setTituloeliminar(textotitulodel)
                setProyectodata( data[0]);
                if (typeof data[0].Logo === "string") {
                    setFileList([
                    {
                        uid: "-1",
                        name: "logo.png",
                        status: "done",
                        url:  data[0].Logo,
                    },
                    ]);
                }
                    
                }
                else{
                    
                    // console.log(result)
                }
            }else{
                setTitulo('NUEVO REGISTRO')
            }
            setLoading(false);
            
        };
        cargardatos()
    
    }, []);
    const registrar= async ()=>{
        
        const endpoint = `RegistrarProyecto`;
        const result = await generarPeticion(endpoint, "POST", proyectodata);
        
        if (result.resp==201){
           success()
           atras()
        }
        else{
            error(result.data.detail)
        }
    }
    const atras=()=>{
    navigate('/Home')
    }
    

    return(
        <div >
            {contextHolder}
            {contextHoldermodal}
            
             {loading ? (
                        <Spin indicator={customIcon} fullscreen />
                      ) 
            : (
                <>
                <Descriptions title={titulo}/>
                <Form layout="inline" size={componentSize as SizeType}>
                    
                    <Row gutter={[16, 16]} style={{ width: '100%', marginBottom: 24  }}>
                        <Col>
                        <Form.Item label="Codigo">
                            <Input 
                            value={idProyecto}
                            disabled 
                            />
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
                        
                            
                            <Form.Item label="Logo" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    fileList={fileList}
                                    onChange={handleImageChange}
                                >
                                    {fileList.length === 0 && (
                                    <button
                                        type="button"
                                        style={{
                                        border: 0,
                                        background: 'none',
                                        cursor: 'pointer',
                                        color: 'inherit',
                                        }}
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
                                <FormsTags
                                detalle_tags={proyectodata.detalle_tags}
                                onUpdate={actualizar_detalle_tags}
                                />  
                            </div>
                        ) 
                        }
                    ]}
                    />
               
                <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
                          <FloatButton  
                                type="primary"
                                icon={<DownloadOutlined/>}     
                                tooltip={<span>Registrar datos</span>}
                                onClick={registrar}
                            />
                            <FloatButton  
                                type="primary" 
                                icon={<RollbackOutlined  />} 
                                tooltip={<span>Volver a Home</span>}
                                onClick={atras}
                            />
                            {deletequestion &&(
                                <FloatButton
                                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                                    tooltip={<span>ELIMINAR</span>}
                                    onClick={abrir_modal}
                                
                                />
                            )}
                            <FloatButton.BackTop  />
                </FloatButton.Group>

                </>
            )}

        </div>
    )
}
  export default Registro