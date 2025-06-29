import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useGenerarPeticion } from '../Apis/apipeticiones';
import { SyncOutlined,CloudSyncOutlined,BackwardOutlined  } from '@ant-design/icons';
import { Spin,Table, Descriptions,Tabs,Form,FloatButton} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
type SizeType = Parameters<typeof Form>[0]['size'];


interface DataTypePorcentajes {
  key: React.Key;
  lenguaje: string;
  valor: number;
  
}
const columns: TableColumnsType<DataTypePorcentajes> = [
  {
    title: 'Lenguaje',
    dataIndex: 'lenguaje',
    width: '70%',
    sorter: (a, b) => a.lenguaje.localeCompare(b.lenguaje), 
  },
  {
    title: 'Porcentaje',
    dataIndex: 'valor',
    sorter: (a, b) => a.valor - b.valor,
    render: (text: string) => (
            <span >{text} %</span>)
  }
  
];



interface DataTypeRespositorios {
  key: React.Key;
  Framework: string;
  NombreRepositorio: string;
  Tipo: string;
  Url: string;
  rowSpan?: number; 
}
const prepareDataWithRowSpans = (data: DataTypeRespositorios[]): DataTypeRespositorios[] => {
  const frameworkGroups: Record<string, DataTypeRespositorios[]> = {};
  
  // Agrupar por Framework
  data.forEach(item => {
    if (!frameworkGroups[item.Framework]) {
      frameworkGroups[item.Framework] = [];
    }
    frameworkGroups[item.Framework].push(item);
  });

  // Preparar datos con rowSpan
  const result: DataTypeRespositorios[] = [];
  Object.values(frameworkGroups).forEach(group => {
    group.forEach((item, index) => {
      result.push({
        ...item,
        rowSpan: index === 0 ? group.length : 0
      });
    });
  });

  return result;
};
const columnsrepositorios: TableColumnsType<DataTypeRespositorios> = [
        {
            title: 'Framework',
            dataIndex: 'Framework',
            key: 'Framework',
            onCell: (record) => ({ rowSpan: record.rowSpan ?? 0 }), // Usamos el operador ?? para proporcionar un valor por defecto
            width: 170,
            render: (text, record) => (
            (record.rowSpan ?? 0) > 0 ? `${text} (${record.rowSpan})` : null
            ),
        },
        
        { title: 'Respositorio', dataIndex: 'NombreRepositorio', key: 'NombreRepositorio', width: 200 },
        { title: 'Tipo', dataIndex: 'Tipo', key: 'Tipo', width: 100 },
        // { title: 'Url', dataIndex: 'Url', key: 'Url' },  
        { 
            title: 'Url', 
            dataIndex: 'Url', 
            key: 'Url',
            render: (text: string) => (
            <a 
                href={text} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Evita que el click afecte a la fila
            >
                {text}
            </a>
            )
        }
    ];

const DataRepositorios: React.FC = () => {
     const [loading, setLoading] = useState(true);
     const [dataporcentajes,setDataporcentajes]=useState<DataTypePorcentajes[]>([]);
     const [componentSize] = useState('small')
     const [processedData, setProcessedData] = useState<DataTypeRespositorios[]>([]);
     const [fechaactualizacion,setFechaactualizacion]=useState(null)
     const generarPeticion = useGenerarPeticion();
     const navigate=useNavigate()

     

     const atras=()=>{
            navigate('/Home')
     }
     const customIcon = (
    
    <SyncOutlined style={{ fontSize: 48, color: "rgba(32,93,93,255)" }} spin />

    );
    const onChange: TableProps<DataTypePorcentajes>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const sincronizar = async () => {
          
            setLoading(true); 
            const body = {};
              
            
            const endpoint = `RegistrarEstadisticasRepositorio/`;
            const result = await generarPeticion(endpoint, "POST", body);
            if (result.resp === 200) {
             await cargardatos()
                
            }
            else{
                
                 console.log(result)
            }
            setLoading(false);
        };
    const cargardatos = async () => {
          
            setLoading(true); 
            const body = {};
              
            
            const endpoint = `ListarFrameworks/`;
            const result = await generarPeticion(endpoint, "GET", body);
            if (result.resp === 200) {
             const data=result.data
             console.log(data)
             setDataporcentajes(data.porcentajes)
            
             setProcessedData(prepareDataWithRowSpans(data.detalles));
             setFechaactualizacion(data.actualizacion)
                
            }
            else{
                
                // console.log(result)
            }
            setLoading(false);
        };
    useEffect(() => {
        const fetchData = async () => {
          await cargardatos();
        };
        fetchData();
      }, []);
    return(
        <div>
            
            {loading ? (
                        <Spin indicator={customIcon} fullscreen />
                      ) : 
                      (
                        <>
                        
                        <Descriptions title="Datos repositorio">
                          <Descriptions.Item label="Ultima actualizacion">{fechaactualizacion}</Descriptions.Item>
                          <Descriptions.Item label="Perfil">
                            <a 
                              href="https://github.com/RafaIbarra" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              https://github.com/RafaIbarra
                            </a>
                          </Descriptions.Item>
                        </Descriptions>
                        <Tabs
                            type="card"
                            
                            size={componentSize as SizeType}
                            style={{ marginTop: '10px', height: '500px', display: 'flex', flexDirection: 'column' }}
                            
                            items={[
                                    {
                                        label: 'Datos de Lenguajes',
                                        
                                        key: '1',
                                        children: (
                                            <div style={{ flex: 1,display: 'flex',flexDirection: 'column',minHeight: 0, }}>
                                              <div style={{ flex: 1 }}>
                                                <Table<DataTypePorcentajes>
                                                columns={columns}
                                                dataSource={dataporcentajes}
                                                onChange={onChange}
                                                size="small"
                                                pagination={false}
                                                scroll={{ y: 400 }} 
                                                rowKey="lenguaje"
                                              />
                                              </div>
                                            </div>
                                          ),
                                    },
                                    {
                                        label: 'Datos de Frameworks',
                                        key: '2',
                                        children: (
                                            <div style={{ flex: 1,display: 'flex',flexDirection: 'column',minHeight: 0, }}>
                                              <div style={{ flex: 1 }}>
                                                <Table<DataTypeRespositorios>
                                                  bordered
                                                  columns={columnsrepositorios}
                                                  pagination={false}
                                                  dataSource={processedData}
                                                  scroll={{ y: 400 }} 
                                                  size="small"
                                                  rowKey="NombreRepositorio"
                                                />
                                              </div>
                                            </div>
                                          ),
                                    }
                                  ]}
                            >
                          
                        </Tabs>

                        <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
                          <FloatButton  
                                type="primary"
                                icon={<CloudSyncOutlined/>}     
                                tooltip={<span>Sincronizar datos</span>}
                                onClick={sincronizar}
                            />
                            <FloatButton  
                                type="primary" 
                                icon={<BackwardOutlined  />} 
                                tooltip={<span>Volver a Home</span>}
                                onClick={atras}
                            />
                            <FloatButton.BackTop  />
                        </FloatButton.Group>


                        
                        </>
                      )
            }
            
            
        </div>
    )
}
export default DataRepositorios