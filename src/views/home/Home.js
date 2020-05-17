import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Dropdown, Button, Menu, Form, Input, Card, Row, Modal } from 'antd';
import uuid from 'react-uuid';
import {
  addInventoryItem,
  deleteInventory,
} from '../../redux/reducers/inventory';
import { DeleteFilled } from '@ant-design/icons';

type Props = {
  dispatch: Function,
  match: Object,
  inventory: Array<Object>,
  types: Array<Object>,
};

const Home = ({ dispatch, match, inventory, types }: Props) => {
  const [list, setList] = useState([]);
  const [typeToAdd, setTypeToAdd] = useState(null);
  const [availableTypes, setAvailableTypes] = useState([]);

  const id = get(match, 'params.id');

  // // get available types and also find if user is in any specific path
  useEffect(() => {
    const availableTypes = types.map(item => {
      const obj = { name: item.name, id: item.id };
      if (item.id === id) setTypeToAdd(obj);
      return obj;
    });
    setAvailableTypes(availableTypes);
  }, [id, types]);

  // filter out list based on id
  useEffect(() => {
    const temp = [...inventory];
    if (id) {
      const filteredList = temp.filter(item => item.parentId === id);
      setList(filteredList);
    } else {
      setList([...inventory]);
    }
  }, [id, inventory]);

  useEffect(() => {
    // when list gets updated , update the inventory
    console.log('here');
  }, [list]);

  const handleAddItem = ({ key }) => {
    console.log(key);
    const index = types.findIndex(item => item.id === key);
    if (index > -1) {
      const obj = types[index];
      const payload = {
        ...obj,
        parentId: obj.id,
        id: uuid(),
      };
      dispatch(addInventoryItem(payload));
    }
  };

  const menu = () => (
    <Menu onClick={handleAddItem}>
      {availableTypes.map(item => (
        <Menu.Item key={item.id}>{item.name}</Menu.Item>
      ))}
    </Menu>
  );

  const handleFieldUpdate = (listIndex, fieldIndex, value, item) => {
    console.log(listIndex, value, fieldIndex, item, inventory);
    let fields = get(item, 'fields');
    if (fields) {
      fields[fieldIndex].value = value;
    }
    const listItemToUpdate = {
      ...item,
      fields,
    };
    const temp = [...list];
    temp[listIndex] = listItemToUpdate;
    setList([...temp]);
  };

  const deleteTypeConfirmation = id => {
    Modal.confirm({
      title: 'Delete?',
      content: 'Are you sure you want to delete this?',
      okText: 'Ok',
      centered: true,
      onOk: () => handleDeleteItem(id),
    });
  };

  const handleDeleteItem = id => {
    const index = inventory.findIndex(item => item.id === id);
    console.log(index);
    if (index > -1) {
      dispatch(deleteInventory(index));
    }
  };

  console.log(list, 'list');

  return (
    <>
      <Row justify="end" style={{ margin: '1rem' }}>
        {!id ? (
          <Dropdown overlay={menu()} placement="bottomLeft">
            <Button>Add Item</Button>
          </Dropdown>
        ) : (
          <Button onClick={() => handleAddItem({ key: typeToAdd.id })}>
            Add {get(typeToAdd, 'name', '')}
          </Button>
        )}
      </Row>
      <Row justif="start">
        {list.map((item, index) => (
          <Card
            style={{ width: 400, marginRight: 20, marginBottom: 20 }}
            key={item.id}
            title={`${item.name}-${get(item, 'fields[0].value', '')}`}
            extra={
              <DeleteFilled
                key="ellipsis"
                onClick={() => deleteTypeConfirmation(item.id)}
              />
            }
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              layout="vertical"
            >
              {item.fields.map((field, fieldIndex) => (
                <Form.Item
                  key={`key-${fieldIndex}`}
                  label={field.name}
                  name={field.name}
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input
                    defaultValue={field.value}
                    onChange={e =>
                      handleFieldUpdate(index, fieldIndex, e.target.value, item)
                    }
                  />
                </Form.Item>
              ))}
            </Form>
          </Card>
        ))}
      </Row>
    </>
  );
};

const mapStateToProps = ({ inventory, types }) => ({
  inventory,
  types,
});

export default connect(mapStateToProps)(Home);
