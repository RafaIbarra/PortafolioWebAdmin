import React from 'react';
import { Breadcrumb, Layout,  theme } from 'antd';
import { Outlet } from 'react-router-dom'; // 👈 Importar esto

const { Content, Footer } = Layout;



const LayoutPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          style={{ margin: '10px 10%' }} // margen lateral en el breadcrumb
          // items={[{ title: 'DATOS PARA GERESA' }]}
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
