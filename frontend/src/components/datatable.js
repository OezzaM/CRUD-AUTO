import React, { useState } from 'react';
import { Table, Space, Button, Input  } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
const Datatable = ({ data, setVisible, setAuto, setActualizar }) => {

    const eliminarAuto = async (id) => {
      setActualizar(true)
      const url = `http://localhost:5000/conductores/${id}`;
      return await fetch(url, {
        method: 'DELETE'
    }).then(response => response.json())
  }
    const columns = [
        {
          title: 'Marca',
          dataIndex: 'marca',
          key: 'marca',
        },
        {
          title: 'Modelo',
          dataIndex: 'modelo',
          key: 'modelo',
        },
        {
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
          render: (text, record) => (
            <Input type="color" disabled defaultValue={text}/> 
          )
        },
        {
          title: 'Observaciones',
          dataIndex: 'observaciones',
          key: 'observaciones'
        },
        {
          title: 'Patente',
          key: 'patente',
          dataIndex: 'patente'
        },
        {
          title: 'Puertas',
          key: 'puertas',
          dataIndex: 'puertas',
        },
        {
          title: 'Accion',
          key: 'accion',
          render: (text, record) => (
            <Space size="middle">
               <Button 
               icon={<EditTwoTone />  } 
               onClick={() => {
                setVisible(true);
                setAuto({
                  _id: text._id,
                  marca: text.marca,
                  modelo: text.modelo,
                  color: text.color,
                  observaciones: text.observaciones,
                  patente: text.patente,
                  puertas: text.puertas
                })
              }}
               />
               <Button icon={<DeleteTwoTone onClick={() => eliminarAuto(text._id) }/>}  />
            </Space>
          )
        },
      ];

      const [productoEdit, setproductoEdit] = useState({});/* 
      const [visible, setVisible] = useState(false); */

    return ( 
        <div>
            <Button
        type="primary"
        style={{border: 0, display: 'block', marginLeft: 'auto', margin:'10px 10px 0 auto'}}
        onClick={() => {
          setVisible(true);
          setAuto({
          _id: '',
          marca: undefined,
          modelo: undefined,
          color: undefined,
          observaciones: undefined,
          patente: undefined,
          puertas: undefined
          })
        }}
      >
        Agregar producto
      </Button>
            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} locale={{emptyText:'No hay autos cargados, ¡Agregue uno! '}} />
        </div>
        );

    }
 
export default Datatable;