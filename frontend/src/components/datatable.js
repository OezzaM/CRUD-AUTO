import React from 'react';
import { Table, Space, Button, Input, Popconfirm, message  } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
const Datatable = ({ data, setVisible, setAuto, setActualizar }) => {

  function confirm(e) {
    eliminarAuto(e)
    message.success('Auto eliminado');
  }
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
          id: 1
        },
        {
          title: 'Modelo',
          dataIndex: 'modelo',
          key: 'modelo',
          id: 2
        },
        {
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
          id: 3,
          render: (text, record) => (
            <Input type="color" disabled defaultValue={text}/> 
          )
        },
        {
          title: 'Observaciones',
          dataIndex: 'observaciones',
          key: 'observaciones',
          id: 4
        },
        {
          title: 'Patente',
          key: 'patente',
          dataIndex: 'patente',
          id: 5
        },
        {
          title: 'Puertas',
          key: 'puertas',
          dataIndex: 'puertas',
          id: 6
        },
        {
          title: 'Accion',
          key: 'accion',
          id: 7,
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
               <Popconfirm
                    title="¿Esta seguro que desea eliminar el auto?"
                    onConfirm={() => confirm(text._id)}
                    okText="Si"
                    cancelText="No"
                    >
                    <Button icon={<DeleteTwoTone />}  />
                      
                </Popconfirm>
            </Space>
          )
        },
      ];

    return ( 
        <div >
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