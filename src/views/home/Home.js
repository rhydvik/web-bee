import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Dropdown, Button, Menu, Form, Input, Card, Row } from 'antd';
import uuid from 'react-uuid';
import { addInventoryItem } from '../../redux/reducers/inventory';

// import { updateFilters } from '../../redux/reducers/filters';

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
      console.log(filteredList);
      setList(filteredList);
    } else {
      setList([...inventory]);
    }
  }, [id, inventory]);

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

  console.log(inventory);

  return (
    <>
      {!id ? (
        <Dropdown overlay={menu()} placement="bottomLeft">
          <Button>Add Item</Button>
        </Dropdown>
      ) : (
        <Button onClick={() => handleAddItem({ key: typeToAdd.id })}>
          Add {get(typeToAdd, 'name', '')}
        </Button>
      )}

      <Row justif="start">
        {list.map(item => (
          <Card
            style={{ width: 400, marginRight: 20 }}
            key={item.id}
            title={item.name}
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              layout="vertical"
              onFieldsChange={(changedFields, allFields) => {
                console.log(changedFields, 'changed');
              }}
            >
              {item.fields.map((field, i) => (
                <Form.Item
                  key={`key-${i}`}
                  label={field.name}
                  name={field.name}
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input defaultValue={field.value} />
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
