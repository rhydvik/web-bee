import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';

import { Filters } from '../components';

type Props = {
  component: any,
  rest?: Object,
  props?: Object,
};

const Layout = ({ component: Component, ...props }: Props) => {
  return (
    <Route
      {...props}
      render={matchProps => (
        <AntLayout style={{ minHeight: '100vh' }}>
          <AntLayout>
            <Filters {...matchProps} {...props} />
            <Component {...matchProps} {...props} />
          </AntLayout>
          )}
        </AntLayout>
      )}
    />
  );
};

export default Layout;
