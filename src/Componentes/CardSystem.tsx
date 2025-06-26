import React, { useState, useContext } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Tag, Row, Col } from 'antd';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import type { ProyectoResumen } from '../types/Proyecto';

interface CardSystemProps {
  data: ProyectoResumen;
}

const CardSystem: React.FC<CardSystemProps> = ({ data }) => {
   const [__idProyecto, setIdProyecto] = useLocalStorage<number>('id_proyecto', 0);
    const { addModulo } = useContext(UserContext)!;
    const navigate=useNavigate()
   const actions: React.ReactNode[] = [
      <EditOutlined key="edit"  onClick={() => handleChangeProyecto(data.id)} />,
    //   <SettingOutlined key="setting" />,
      
    ];

    const handleChangeProyecto = (nuevoId: number) => {
     addModulo({ title: `Actualizar Registro/${nuevoId}/`});
      
      setIdProyecto(nuevoId);
      navigate('/Registro')
  };
    const [loading] = useState<boolean>(false);
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    return(
      
          

          <Card size="small" loading={loading} actions={actions} 
          // style={{ width: 300 }}
          style={{
            width: 300,
            height: 250,         
            overflowY: 'auto',   
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between' // distribuye el espacio
          }}
          >
          <Card.Meta
            
            avatar={<Avatar src={data.Logo} />}
            
            title={data.Sistema}
            description={
              <>
              
                <p>{data.Descripcion}</p>
                <p>{data.fecha_registro}</p>
                {/* <Divider />
                  {data.detalle_tags.map((tag) => (
                  <Tag key={tag.id} color={getRandomColor()}>
                      #{tag.Tag}
                  </Tag>
                  ))} */}
                  <Row gutter={[10, 2]}>
                              {data.detalle_tags.map((tag) => (
                              <Col key={tag.id}  xs={24} sm={12} md={8}>
                                  <Tag key={tag.id} color={getRandomColor()}>
                                        #{tag.Tag}
                                  </Tag>
                              </Col>
                              ))}
                  </Row>
              </>
            
            }
          />
        </Card>
      
    )
    };

export default CardSystem;