import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { updateFilters } from '../../redux/reducers/filters';

type Props = {
  dispatch: Function,
  list: Array<Object>,
};

const Home = ({ dispatch, list }: Props) => {
  const handleDispatch = () => {
    dispatch(updateFilters(['1', '2']));
  };

  console.log(list);
  return (
    <div>
      Home
      <Button onClick={handleDispatch} type="primary">
        Primary
      </Button>
    </div>
  );
};

const mapStateToProps = ({ filters }) => ({
  list: filters.list,
});

export default connect(mapStateToProps)(Home);
