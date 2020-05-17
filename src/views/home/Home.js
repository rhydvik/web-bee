import React from 'react';
import { connect } from 'react-redux';
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
      <button onClick={handleDispatch}>Dispatch button</button>
    </div>
  );
};

const mapStateToProps = ({ filters }) => ({
  list: filters.list,
});

export default connect(mapStateToProps)(Home);