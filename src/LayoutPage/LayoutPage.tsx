import React, { useContext }  from 'react';
import { Breadcrumb, Layout,  theme } from 'antd';
import { Outlet } from 'react-router-dom'; // 
import { UserContext } from '../context/UserContext';
const { Content, Footer } = Layout;
const LayoutPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext debe usarse dentro de UserProvider");

  
  const { modulosistema } = useContext(UserContext)!;
  
 const breadcrumbItems = modulosistema.map(modulo => ({
    title: modulo.title,
    // Puedes añadir más propiedades si lo necesitas:
    // path: '/ruta', 
    // href: '/enlace',
  }));

  return (
    <Layout  style={{
      
      minHeight: '97vh', // que ocupe toda la altura de la pantalla
      display: 'flex',
      flexDirection: 'column',
      
    }}>
      
      <Content
        style={{
          flex: 1, // que ocupe el espacio restante
          padding: '0px',
          
        }}
      >
        <Breadcrumb
         style={{ margin: '10px 10%' ,fontSize:'25px'}} // margen lateral en el breadcrumb
         items={breadcrumbItems}
        />
        <div
          
          style={{
            background: colorBgContainer,
            minHeight: '100%', // ocupa el alto disponible en Content
            margin: '0 10%',
            padding: 24,
            borderRadius: borderRadiusLG,
            boxSizing: 'border-box',
          }}
        >
          
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Rafael Ibarra ©{new Date().getFullYear()} 
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
