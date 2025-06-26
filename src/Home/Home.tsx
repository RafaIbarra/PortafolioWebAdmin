import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGenerarPeticion } from '../Apis/apipeticiones';
import CardSystem from '../Componentes/CardSystem';
import Loading from '../Componentes/Loading';
import { Row, Col, FloatButton, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useLocalStorage from '../hooks/useLocalStorage';
import { UserContext } from '../context/UserContext';
import type { ProyectoResumen } from '../types/Proyecto';
import './home.css'

const Home: React.FC = () => {
  const generarPeticion = useGenerarPeticion();
  const { setModuloSistema, addModulo } = useContext(UserContext)!;
  const [datasistemas, setDatasistemas] = useState<ProyectoResumen[]>([]);
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
  
  useEffect(() => {
    setModuloSistema([])
    addModulo({ title: 'Home' });
  }, []);
  useEffect(() => {

        
        
    const cargardatos = async () => {
      
        setLoading(true); 
        const body = {};
          
        await new Promise(resolve => setTimeout(resolve, 4000));
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
            <Loading fullscreen />
          ) : (
            <div>
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