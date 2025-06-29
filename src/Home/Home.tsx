import React,{useEffect,useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";

import { useGenerarPeticion } from '../Apis/apipeticiones';
import CardSystem from '../Componentes/CardSystem';
import { Row, Col,Spin,FloatButton,Divider,Descriptions } from 'antd';
import { SyncOutlined,PlusOutlined,GithubOutlined} from '@ant-design/icons';
import useLocalStorage from '../hooks/useLocalStorage';
import { UserContext } from '../context/UserContext';

import './home.css'

const Home: React.FC = () => {
  const generarPeticion = useGenerarPeticion();
  const { setModuloSistema,addModulo } = useContext(UserContext)!;
  const [datasistemas, setDatasistemas] = useState<DataType[]>([]); 
  const [__idProyecto, setIdProyecto] = useLocalStorage<number>('id_proyecto', 0);
  const [loading, setLoading] = useState(true);
 
  const navigate=useNavigate()

   const handleChangeProyecto = (nuevoId: number) => {
      
    setIdProyecto(nuevoId);
  };
  const registrar =()=>{
    handleChangeProyecto(0)
    addModulo({ title: 'Nuevo Registro' });
    navigate('/Registro')
  }
  const repositorios =()=>{
    
    addModulo({ title: 'Datos Repositorios' });
    navigate('/Repositorios')
  }
  
  interface TagsType{
    id :number,
    Tag:string;
  }
  interface DataType {
     
      Sistema: string;
      Logo: string;
      Descripcion: string;
      id: number; 
      fecha_registro:string;
      detalle_tags:TagsType[];
      
    }
  const customIcon = (
    
    <SyncOutlined style={{ fontSize: 48, color: "rgba(32,93,93,255)" }} spin />

    );
  useEffect(() => {
    setModuloSistema([])
    addModulo({ title: 'Home' });
  }, []);
  useEffect(() => {

        
        
    const cargardatos = async () => {
      
        setLoading(true); 
        const body = {};
          
        
        const endpoint = `ListarProyectos/0/`;
        const result = await generarPeticion(endpoint, "GET", body);
        if (result.resp === 200) {
        // const data=result.data
        // console.log(data)
        setDatasistemas(result.data)
            
        }
        else{
            
            // console.log(result)
        }
        setLoading(false);
    };
    cargardatos()
    
  }, []);

    return (
      <div>
        {loading ? (
            <Spin indicator={customIcon} fullscreen />
          ) : (
            <div>
              <Descriptions title="PROYECTOS"/>
              {(() => {
                // Agrupamos los items en filas de a 3
                const chunkedData = [];
                for (let i = 0; i < datasistemas.length; i += 3) {
                  chunkedData.push(datasistemas.slice(i, i + 3));
                }

                return chunkedData.map((rowItems, rowIndex) => (
                  <div key={rowIndex}>
                    <Row gutter={[16, 16]}>
                      {rowItems.map((item) => (
                        <Col key={item.id} xs={24} sm={12} md={8}>
                          <CardSystem data={item} />
                        </Col>
                      ))}
                    </Row>
                    {rowIndex !== chunkedData.length - 1 && <Divider />} {/* Evita el Divider en la última fila */}
                  </div>
                ));
              })()}
            </div>
          )}

        
        <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
          <FloatButton  
                
                icon={<GithubOutlined/>}     
                tooltip={<div>Datos Repositorios</div>}
                onClick={repositorios}
            />
            <FloatButton  
                type="primary" 
                icon={<PlusOutlined  />} 
                tooltip={<div>Agregar Proyecto</div>}
                onClick={registrar}
            />
            <FloatButton.BackTop  />
        </FloatButton.Group>
        
       
      </div>
    ) 
  }
  
  export default Home