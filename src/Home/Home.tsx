import React,{useEffect,useState} from 'react'
import Generarpeticion from '../Apis/apipeticiones';
import CardSystem from '../Componentes/CardSystem';
import { Row, Col,Spin,FloatButton  } from 'antd';
import { SyncOutlined,QuestionCircleOutlined,PlusOutlined  } from '@ant-design/icons';
import './home.css'

const Home: React.FC = () => {
  const [datasistemas, setDatasistemas] = useState<DataType[]>([]); 
  const [loading, setLoading] = useState(true);
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
//   <SyncOutlined style={{ fontSize: 48, color: '#2ca9ff' }} spin />
<SyncOutlined style={{ fontSize: 48, color: "rgba(32,93,93,255)" }} spin />

);
  useEffect(() => {

        
        
    const cargardatos = async () => {
        setLoading(true); 
        const body = {};
          
        await new Promise(resolve => setTimeout(resolve, 4000));
        const endpoint = `ListarProyectos/0/`;
        const result = await Generarpeticion(endpoint, "GET", body);
        if (result.resp === 200) {
        const data=result.data
        console.log(data)
        setDatasistemas(result.data)
            
        }
        else{
            
            console.log(result)
        }
        setLoading(false);
    };
    cargardatos()
    
  }, []);

    return (
      <div>
        
        {/* {loading ? (
                    <Skeleton.Input active size="small" />
                ) : (
        <Row gutter={[16, 16]}>
            {datasistemas.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8}>
                <CardSystem data={item} />
            </Col>
            ))}

        </Row>)} */}
        {
            loading ?(
                // <Spin percent= 'auto'  size="large" fullscreen className="custom-spinner"  />
                <Spin indicator={customIcon} fullscreen />
            ):(
                <Row gutter={[16, 16]}>
            {datasistemas.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8}>
                <CardSystem data={item} />
            </Col>
            ))}
        </Row>
            )
        }
        <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
            <FloatButton  
                type="primary" 
                icon={<PlusOutlined  />} 
                // tooltip={{
                //     // tooltipProps is supported starting from version 5.25.0.
                //     title: 'Since 5.25.0+',
                //     color: 'blue',
                //     placement: 'top',
                // }}
                 tooltip={<div>Agregar Proyecto</div>}
            />
            
            <FloatButton.BackTop  />
        </FloatButton.Group>
        
        {/* <FloatButton.BackTop /> */}

      </div>
    ) 
  }
  
  export default Home