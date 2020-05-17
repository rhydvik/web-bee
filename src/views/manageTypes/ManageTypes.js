/* @flow */
import React, { useState } from 'react';
import { Layout, Button, Row, Modal } from 'antd';
import { connect } from 'react-redux';

import Types from './Types';
import AddTypeModal from './AddTypeModal';
import { updateType } from '../../redux/reducers/types';

// import styles from './styles.css';

type Props = {
  types: Array<Object>,
  dispatch: Function,
};

const ManageTypes = ({ types, dispatch }: Props) => {
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [dataForEdit, setDataForEdit] = useState({});

  const handleAddType = () => {
    setShowAddTypeModal(true);
  };

  const handleAddTypeClose = () => {
    setShowAddTypeModal(false);
    setDataForEdit({});
  };

  const handleSubmit = data => {
    const temp = [...types];
    const index = types.findIndex(item => item.id === dataForEdit.id);
    if (index > -1) {
      temp[index] = data;
    } else {
      temp.push(data);
    }
    dispatch(updateType(temp));
    setShowAddTypeModal(false);
    setDataForEdit({});
  };

  const handleTypeEdit = index => {
    setDataForEdit(types[index]);
    setShowAddTypeModal(true);
  };

  const deleteTypeConfirmation = index => {
    Modal.confirm({
      title: 'Delete Type?',
      content: 'Are you sure you want to delete this type?',
      okText: 'Ok',
      centered: true,
      onOk: () => handleDeleteType(index),
    });
  };

  const handleDeleteType = index => {
    const temp = [...types];
    temp.splice(index, 1);
    dispatch(updateType(temp));
  };

  return (
    <>
      <Layout.Content style={{ padding: 20 }}>
        <Row justify="space-between" style={{ marginBottom: '1rem' }}>
          <h1>Available Types</h1>
          <Button onClick={handleAddType}>Add New Type</Button>
        </Row>

        <Types
          data={types}
          deleteTypeConfirmation={deleteTypeConfirmation}
          handleTypeEdit={handleTypeEdit}
        />
        <AddTypeModal
          isVisible={showAddTypeModal}
          onClose={handleAddTypeClose}
          onSubmit={handleSubmit}
          dataForEdit={dataForEdit}
        />
      </Layout.Content>
    </>
  );
};

const mapStateToProps = ({ types }) => ({
  types,
});

export default connect(mapStateToProps)(ManageTypes);
