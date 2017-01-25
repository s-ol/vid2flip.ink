import React from 'react';

import { restoreState, storeState } from '../storage';

const settingsStore = WrappedComponent => {
  class SettingsStore extends React.Component {
    constructor(props) {
      super(props);

      // this.setHexFormat = this.setHexFormat.bind(this);

      this.state = restoreState('settings', {
      });
    }

    componentWillUpdate(props, state) {
      storeState('settings', state);
    }

    getChildContext() {
      const { hexFormat, halfedTable, allowedFactors } = this.state;
      return {
        // hexFormat,
        // setHexFormat: this.setHexFormat,
      };
    }

    // setHexFormat(hexFormat) {
    //   this.setState({ hexFormat });
    // }

    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }

  SettingsStore.childContextTypes = {
    // hexFormat: React.PropTypes.string,
    // setHexFormat: React.PropTypes.func,
  };

  return SettingsStore;
};

export default settingsStore;
