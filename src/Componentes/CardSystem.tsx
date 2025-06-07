import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card,Tag,Divider,Row, Col } from 'antd';

interface TagsType{
    id :number,
    Tag:string;
  }
interface CardData {
     Sistema: string;
      Logo: string;
      Descripcion: string;
      id: number; 
      fecha_registro:string;
      detalle_tags:TagsType[];
}
interface CardSystemProps {
  data: CardData;
}
const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
//   <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];
const CardSystem: React.FC<CardSystemProps> = ({ data }) => {
    const [loading, setLoading] = useState<boolean>(false);
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
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
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