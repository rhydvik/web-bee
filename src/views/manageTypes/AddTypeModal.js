/* @flow */
import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import { Form, Input, Button, Row } from 'antd';
import uuid from 'react-uuid';
import { get } from 'lodash';

const getNamesFromFields = fields => {
  const temp = [];
  fields.map(item => temp.push(item.name));
  return temp;
};

const fieldOptions = [
  {
    name: 'Small Text',
    type: 'SMALL_TEXT',
  },
  {
    name: 'Long Text',
    type: 'LONG_TEXT',
  },
  {
    name: 'Number',
    type: 'NUMBER',
  },
  {
    name: 'Date',
    type: 'DATE',
  },
  {
    name: 'Remove',
    type: 'REMOVE',
  },
];

type Props = {
  isVisible: boolean,
  onClose: Function,
  onSubmit: Function,
  dataForEdit: Object,
};

const AddTypeModal = ({ isVisible, onClose, onSubmit, dataForEdit }: Props) => {
  const [fields, setFields] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({});

  useEffect(() => {
    setFields(get(dataForEdit, 'fields', []));
    const temp = {
      name: get(dataForEdit, 'name', ''),
      title: get(dataForEdit, 'title', ''),
    };

    get(dataForEdit, 'fields', []).map((item, index) => {
      console.log(item);
      temp[`fields.${index}.name`] = item.name;
      temp[`fields.${index}.fieldType`] = item.fieldType;
    });
    console.log(temp, 'temp');
    setFormInitialValues(temp);
  }, [dataForEdit]);

  const handleAddFields = () => {
    const temp = {
      name: '',
      fieldType: '',
    };
    setFields([...fields, temp]);
  };

  const handleInputChange = (event, index) => {
    const text = event.target.value;
    const temp = [...fields];
    temp[index].name = text;
    setFields([...temp]);
  };

  const handleTypeChange = (value, index) => {
    const temp = [...fields];
    if (value === 'REMOVE') {
      temp.splice(index, 1);
    } else {
      temp[index].fieldType = value;
    }
    setFields([...temp]);
  };

  const onFinish = values => {
    console.log('Success:', values);
    const type = {
      ...values,
      id: get(dataForEdit, 'id', uuid()),
    };
    onSubmit(type);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      title="Add new type"
      destroyOnClose={true}
    >
      <Form
        name="basic"
        initialValues={{
          ...formInitialValues,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Object Type"
          name="name"
          rules={[{ required: true, message: 'Object Name is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Object Title"
          name="title"
          rules={[{ required: true, message: 'Title is required!' }]}
        >
          <Select>
            {getNamesFromFields(fields).map((item, index) => (
              <Select.Option key={`key-${index}-${item}`} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <p>Fields</p>
        {fields.map((item, index) => (
          <Row
            key={`key-${index}-${item.fieldType}`}
            style={{ marginBottom: '1rem' }}
          >
            <Input.Group compact>
              <Form.Item
                name={['fields', index, 'name']}
                noStyle
                rules={[{ required: true, message: 'Title is required!' }]}
              >
                <Input
                  style={{ width: '50%' }}
                  placeholder="Input Title"
                  onChange={e => handleInputChange(e, index)}
                  defaultValue={get(item, 'name', '')}
                />
              </Form.Item>
              <Form.Item
                name={['fields', index, 'fieldType']}
                noStyle
                rules={[{ required: true, message: 'Title is required!' }]}
              >
                <Select
                  placeholder="Select Type"
                  onChange={value => handleTypeChange(value, index)}
                  defaultValue={get(item, 'fieldType', '')}
                  style={{ width: 200 }}
                >
                  {fieldOptions.map((item, index) => (
                    <Select.Option
                      key={`key-${index}-${item}`}
                      value={item.type}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Input.Group>
          </Row>
        ))}
        <Button
          type="primary"
          onClick={handleAddFields}
          style={{ marginTop: '1rem' }}
        >
          Add Fields
        </Button>

        <Row style={{ margin: '2rem' }} justify="center">
          <Button onClick={onClose} style={{ marginRight: 10 }}>
            Close
          </Button>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddTypeModal;
