import React,{useEffect,} from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin } from "antd";
import { SyncOutlined } from '@ant-design/icons';
const CerrandoSesion: React.FC = () => {
const navigate=useNavigate()
const customIcon = (
    
        <SyncOutlined style={{ fontSize: 48, color: "rgba(32,93,93,255)" }} spin />

        );
useEffect(() => {
       const cargardatos = async () => {
            
            
              await new Promise(resolve => setTimeout(resolve, 2000));
              navigate('/')
            
          };
          cargardatos()
          
        }, []);

    return(
        
            <Spin indicator={customIcon} fullscreen />
            
        
    )

}

export default CerrandoSesion