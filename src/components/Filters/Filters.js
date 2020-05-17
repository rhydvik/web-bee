import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
  availableFilters: Array<string>,
  currentFilter: string,
};

const Filters = ({ availableFilters = [], currentFilter = 'All' }: Props) => {
  const [current, setCurrent] = useState(currentFilter);

  const handleClick = ({ key }) => {
    setCurrent(key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {availableFilters.map(item => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
      <Menu.Item key="Manage Types">
        <Link to="/types/manageTypes">Manage Types</Link>
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = ({ filters }) => ({
  availableFilters: filters.availableFilters,
  currentFilter: filters.currentFilter,
});

export default connect(mapStateToProps)(Filters);
