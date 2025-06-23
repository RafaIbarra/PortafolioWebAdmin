import React, { useContext } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
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
  }));

  return (
    <Layout style={{
      minHeight: '97vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Content
        style={{
          flex: 1,
          padding: '0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centra horizontalmente
          
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1200px', // Puedes ajustar este valor según necesites
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          <Breadcrumb
            style={{ 
              margin: '10px 0', 
              fontSize: '25px',
              width: '100%'
            }}
            items={breadcrumbItems}
          />
          <div
            style={{
              background: colorBgContainer,
              minHeight: '100%',
              width: '100%',
              padding: 24,
              borderRadius: borderRadiusLG,
              boxSizing: 'border-box',
            }}
          >
            <Outlet />
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Rafael Ibarra ©{new Date().getFullYear()} 
      </Footer>
    </Layout>
  );
};

export default LayoutPage;