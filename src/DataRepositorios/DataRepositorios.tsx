import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useGenerarPeticion } from '../Apis/apipeticiones';
import { SyncOutlined} from '@ant-design/icons';
import { Spin,Table, Tooltip} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

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
    
     const [processedData, setProcessedData] = useState<DataTypeRespositorios[]>([]);
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
     useEffect(() => {
    
            
            
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
            
                
            }
            else{
                
                // console.log(result)
            }
            setLoading(false);
        };
        cargardatos()
        
      }, []);
    return(
        <div>
            <button onClick={atras}>atras</button>
            {loading ? (
                        <Spin indicator={customIcon} fullscreen />
                      ) : 
                      (
                        <>
                        <Table<DataTypePorcentajes> columns={columns} dataSource={dataporcentajes} onChange={onChange} size="small"/>
                        <Table<DataTypeRespositorios>
                            bordered
                            columns={columnsrepositorios}
                            pagination={false} 
                           dataSource={processedData}
                           scroll={{ y: 'calc(500px)' }}
                        />
                        </>
                      )
            }
            
            
        </div>
    )
}
export default DataRepositorios