import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {UPDATE_SETTINGS} from '../../../shared/action-types';

import TextInput from '../../components/text-input';

class DefaultLife extends React.PureComponent {
  static propTypes = {
    defaultLife: PropTypes.number,
    saveLife: PropTypes.func,
  };

  state = {
    newDefaultLife: this.props.defaultLife,
    hasSaved: false,
  };

  componentDidUpdate(prevProps) {
    const {defaultLife: prevLife} = prevProps;
    const {defaultLife} = this.props;
    if (defaultLife !== prevLife) {
      this.setState({
        hasSaved: true,
      });
    }
  }

  handleChange = event => {
    this.setState({newDefaultLife: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const {newDefaultLife} = this.state;
    const {saveLife} = this.props;
    saveLife(parseInt(newDefaultLife));
  };

  render() {
    const {newDefaultLife, hasSaved} = this.state;
    if (hasSaved) return <Redirect to="/settings" />;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          id="defaultLife"
          label="Default life total"
          inputProps={{
            autoComplete: 'off',
            type: 'number',
            required: true,
            value: newDefaultLife,
            onChange: this.handleChange,
            pattern: '\\d*',
          }}
        />
        <div className="button-group">
          <Link to="/settings" replace className="button button--secondary">
            Cancel
          </Link>
          <button className="button button--primary">Save</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const {
    settings: {defaultLife},
  } = state;
  return {
    defaultLife,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLife: defaultLife => {
      dispatch({
        type: UPDATE_SETTINGS,
        settings: {defaultLife},
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLife);
