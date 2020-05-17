/* @flow */
import React from 'react';
import { Row, Card, Divider } from 'antd';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

type Props = {
  data: Array<Object>,
  deleteTypeConfirmation: Function,
  handleTypeEdit: Function,
};

const Types = ({ data, deleteTypeConfirmation, handleTypeEdit }: Props) => {
  return (
    <Row justify="start">
      {data.map((item, index) => (
        <Card
          style={{ width: 300, marginRight: 30 }}
          key={item.id}
          actions={[
            <EditOutlined key="edit" onClick={() => handleTypeEdit(index)} />,
            <DeleteFilled
              key="ellipsis"
              onClick={() => deleteTypeConfirmation(index)}
            />,
          ]}
        >
          <h3>Type: {item.name}</h3>
          <h3>Title: {item.title}</h3>
          <Divider />
          <h4>Available Fields</h4>
          {item.fields.map((field, i) => (
            <span style={{ marginRight: 5 }} key={`${field.name}-${i}`}>
              {field.name},
            </span>
          ))}
        </Card>
      ))}
    </Row>
  );
};

export default Types;
