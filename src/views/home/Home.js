import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Dropdown, Button, Menu, Row, Modal } from 'antd';
import uuid from 'react-uuid';
import {
  addInventoryItem,
  deleteInventory,
  updateInventory,
} from '../../redux/reducers/inventory';
import ItemCard from './itemCard';

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

  const handleFieldUpdate = (listIndex, fieldIndex, value, itemToUpdate) => {
    console.log(itemToUpdate, inventory);
    let fields = [...get(itemToUpdate, 'fields', [])];
    if (fields) {
      fields[fieldIndex] = {
        ...fields[fieldIndex],
        value: value,
      };
    }
    const listItemToUpdate = {
      ...itemToUpdate,
      fields,
    };
    const temp = [...list];
    temp[listIndex] = listItemToUpdate;
    setList([...temp]);

    // find inventory id an update inventory
    const inventoryIndex = inventory.findIndex(
      item => item.id === itemToUpdate.id,
    );
    if (inventoryIndex > -1) {
      dispatch(updateInventory(inventoryIndex, listItemToUpdate));
    }
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

  console.log(inventory, 'inventory');

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

      <ItemCard
        list={list}
        handleFieldUpdate={handleFieldUpdate}
        deleteTypeConfirmation={deleteTypeConfirmation}
      />
    </>
  );
};

const mapStateToProps = ({ inventory, types }) => ({
  inventory,
  types,
});

export default connect(mapStateToProps)(Home);
