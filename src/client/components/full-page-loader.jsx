import React, {Fragment} from 'react';

import Loader from './loader';

class FullPageLoader extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <main className="view-main view-main--flex">
          <Loader />
        </main>
      </Fragment>
    );
  }
}

export default FullPageLoader;
