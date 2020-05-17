/* @flow */
import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import { Form, Input, Button, Row } from 'antd';

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
};

const AddTypeModal = ({ isVisible, onClose }: Props) => {
  const [fields, setFields] = useState([]);

  const handleAddFields = () => {
    const temp = {
      name: 'title',
      fieldType: 'SMALL_TEXT',
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
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  console.log(fields, 'fields');
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
        initialValues={{ remember: true }}
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
          <Row key={`key-${index}-${item.fieldType}`}>
            <Form.Item>
              <Input.Group compact>
                <Form.Item
                  name={`fields.${index}.name`}
                  noStyle
                  rules={[{ required: true, message: 'Title is required' }]}
                >
                  <Input
                    style={{ width: '50%' }}
                    placeholder="Input Title"
                    onChange={e => handleInputChange(e, index)}
                  />
                </Form.Item>
                <Form.Item
                  name={`fields.${index}.type`}
                  noStyle
                  rules={[{ required: true, message: 'Type is required' }]}
                >
                  <Select
                    placeholder="Select Type"
                    onChange={value => handleTypeChange(value, index)}
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
            </Form.Item>
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
