import React,{ useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, InputNumber, Select, notification } from 'antd';

const Modals = ({ visible, setVisible, auto, setActualizar}) => {
    
  const {_id, marca, modelo, observaciones, patente, color, puertas} = auto;
 
  const onCancel = () => {
    setVisible(false);
  };

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message
    });
  };

    const [form] = Form.useForm();

    useEffect(() => {
      form.resetFields();
      form.setFieldsValue({
        marca,
        modelo,
        color,
        observaciones,
        patente,
        puertas
      });

    }, [auto,color, form, marca, observaciones, patente, puertas, modelo])
    const validateMessages = {
        required: '${label} es requerido',
        types: {
          email: 'Por favor introduzca un mail valido',
          number: '${label} is not a validate number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
    return ( 
      <Modal
      visible={visible}
      title="Agregar un nuevo auto"
      okText="Agregar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
        .validateFields()
        .then((values) => { 
            setVisible(false)
            if(_id){
            const url = `http://localhost:5000/conductores/${_id}`;
            const data = {...values};
              fetch(url, {
              method: 'PUT', // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(res => res.json())
            /* .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response)); */
            openNotificationWithIcon('success', 'Auto actualizado correctamente')
            }else{
              const url = `http://localhost:5000/conductores/`;
              const data = {...values};
              fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(res => res.json())
            /* .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response)); */
            openNotificationWithIcon('success', 'Auto creado correctamente')
            }
            setActualizar(true);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
forceRender
    >
      <Form
      style={{ marginLeft: 'auto !important', marginRight: 'auto !important'}}
      validateMessages={validateMessages}
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
      <Form.Item style={{marginBottom: 0}}>
      <Input.Group compact>
        <Form.Item
          name="marca"
          label="Marca"/* 
          initialValue={marca} */
          hasFeedback
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          rules={[
            {
              required: true,
              message: 'Seleccione una marca',
            },
          ]}
        >
          <Input />
          </Form.Item>

          <Form.Item style={{marginBottom: 0}}>
      <Input.Group compact>
      <Form.Item
      style={{width: '100%', marginLeft:'8px'}}
        name="modelo"
        label="Modelo"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Selecciona un modelo',
          },
        ]}
      >
        <Select placeholder="Seleccione un modelo">
          <Select.Option value="2000">2000</Select.Option>
          <Select.Option value="2001">2001</Select.Option>
          <Select.Option value="2002">2002</Select.Option>
          <Select.Option value="2003">2003</Select.Option>
          <Select.Option value="2004">2004</Select.Option>
          <Select.Option value="2005">2005</Select.Option>
          <Select.Option value="2006">2006</Select.Option>
          <Select.Option value="2007">2007</Select.Option>
          <Select.Option value="2008">2008</Select.Option>
          <Select.Option value="2009">2009</Select.Option>
          <Select.Option value="2010">2010</Select.Option>
          <Select.Option value="2011">2011</Select.Option>
          <Select.Option value="2012">2012</Select.Option>
          <Select.Option value="2013">2013</Select.Option>
          <Select.Option value="2014">2014</Select.Option>
          <Select.Option value="2015">2015</Select.Option>
          <Select.Option value="2016">2016</Select.Option>
          <Select.Option value="2017">2017</Select.Option>
          <Select.Option value="2018">2018</Select.Option>
          <Select.Option value="2019">2019</Select.Option>
          <Select.Option value="2020">2020</Select.Option>
        </Select>
      </Form.Item>
      </Input.Group>
    </Form.Item>
      </Input.Group>
    </Form.Item>

    <Form.Item style={{marginBottom: 0}}>
      <Input.Group compact>
      <Form.Item
          name="color"
          label="Color"
          hasFeedback
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          rules={[
            {
              required: true,
              message: 'Selecciona un color',
            },
          ]}
        >
          <Input type="color" />
        </Form.Item>
        <Form.Item
          name="puertas"
          label="Puertas"
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          rules={[
            {
              required: true,
              message: 'Seleccione la cantidad de puertas',
            },
          ]}
        >
          <InputNumber />
          </Form.Item>
      </Input.Group>
    </Form.Item>

    <Form.Item
          name="patente"
          label="Patente"
          hasFeedback
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          rules={[
            {
              required: true,
              message: 'Seleccione una patente',
            },
          ]}
        >
          <Input />
          </Form.Item>
    

    
        <Form.Item name="observaciones" label="Descripcion" hasFeedback rules={[
          {
            required: true,
            message: 'Seleccione una observacion',
          },
        ]}>
          
          <Input.TextArea showCount style={{resize: 'none'}} maxLength={100} />
        </Form.Item>
      </Form>
    </Modal>
     );
}
 
export default Modals;