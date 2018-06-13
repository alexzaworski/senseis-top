import React, {Fragment} from 'react';

class Help extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <h3 className="subheader">Help</h3>
        <p>
          Something broken? Missing an important feature? Feel free to{' '}
          <a href="https://github.com/alexzaworski/senseis-top/issues/">
            open an issue on GitHub.
          </a>
        </p>
      </Fragment>
    );
  }
}

export default Help;
