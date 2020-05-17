/* @flow */
import React from 'react';
import { Table } from 'antd';

type Props = {
  data: Array<Object>,
};

const TypesTable = ({ data }: Props) => {
  return (
    <Table
      dataSource={data}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
      ]}
    />
  );
};

export default TypesTable;
