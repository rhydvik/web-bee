/* @flow */
import React, { useState } from 'react';
import { Layout, Button, Row } from 'antd';
import { connect } from 'react-redux';
import TypesTable from './TypesTable';
import AddTypeModal from './AddTypeModal';

// import styles from './styles.css';

type Props = {
  types: Array<Object>,
};

const ManageTypes = ({ types }: Props) => {
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);

  const handleAddType = () => {
    setShowAddTypeModal(true);
  };

  const handleAddTypeClose = () => {
    setShowAddTypeModal(false);
  };

  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <Layout.Content style={{ padding: 20 }}>
        <Row justify="space-between" style={{ marginBottom: '1rem' }}>
          <h1>Available Types</h1>
          <Button onClick={handleAddType}>Add New Type</Button>
        </Row>

        <TypesTable data={types} />
        <AddTypeModal
          isVisible={showAddTypeModal}
          onClose={handleAddTypeClose}
          onSubmit={handleSubmit}
        />
      </Layout.Content>
    </>
  );
};

const mapStateToProps = ({ types }) => ({
  types,
});

export default connect(mapStateToProps)(ManageTypes);
