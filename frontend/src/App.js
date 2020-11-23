import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Space } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CarOutlined,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Datatable from './components/datatable';
import Modals from './components/modal'


require('es6-promise').polyfill()
require('isomorphic-fetch');

const { Header, Sider, Content } = Layout;

function App() {

  const [data, setData] = useState([]);

  const [auto, setAuto] = useState('')

  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/conductores')
    .then(response => response.json())
    .then(json => setData(json));
    setActualizar(false)
  }, [actualizar])

  const [collapsed, setCollapsed] = useState(true);
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  }
  

  return (
    <div className="body">
      <Modals 
        visible={visible}
        setVisible={setVisible}
        auto={auto}
        setActualizar={setActualizar}
      />
 <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <h1 align="center" style={{color:'white', fontSize:20, marginTop:19}}>DISEÑO</h1>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<CarOutlined />}>
              Autos
            </Menu.Item>
            <Menu.Item key="2" icon={<FileTextOutlined />}>
              Viajes
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Pasajeros
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="header" style={{padding:'0px 15px', color:'white', fontSize:20}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
          >{/* 
           <Table columns={columns} dataSource={data} /> */}
           <Datatable 
            data={data}/* 
            visible={visible} */
            setVisible={setVisible}
            setAuto={setAuto}
            setActualizar={setActualizar}
           />
          </Content>
        </Layout>
      </Layout> 

    </div>
        );
}

export default App;
