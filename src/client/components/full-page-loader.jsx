import React, {Fragment} from 'react';

import Loader from './loader';

class FullPageLoader extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <main className="view-main view-main--centered">
          <Loader />
        </main>
      </Fragment>
    );
  }
}

export default FullPageLoader;
