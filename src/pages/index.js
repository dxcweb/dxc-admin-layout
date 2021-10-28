import React from 'react';
import Redirect from 'umi/redirect';

export default class index extends React.PureComponent {
  render() {
    return <Redirect to="/dashboard" />;
  }
}
