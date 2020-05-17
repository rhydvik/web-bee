import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

type Props = {
  currentFilter: string,
  types: Array<Object>,
  match: Object,
};

const Filters = ({ types, match }: Props) => {
  const [current, setCurrent] = useState('');
  const [availableFilters, setAvailableFilters] = useState([{ name: 'All' }]);

  const id = get(match, 'params.id', null);

  useEffect(() => {
    // create and set available filters
    const temp = types.map(item => {
      const obj = {
        name: item.name,
        id: item.id,
      };
      if (item.id === id) setCurrent(item.name);
      return obj;
    });
    setAvailableFilters([{ name: 'All' }, ...temp]);
  }, [id, types]);

  const handleClick = ({ key }) => {
    setCurrent(key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {availableFilters.map(item => (
        <Menu.Item key={item.name}>
          <Link to={item.id ? `/type/${get(item, 'id', '')}` : '/'}>
            {item.name}
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item key="Manage Types">
        <Link to="/manage/types">Manage Types</Link>
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = ({ types }) => ({
  types,
});

export default connect(mapStateToProps)(Filters);
