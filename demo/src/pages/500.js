import React from 'react';
import { Exception } from 'dxc-admin-layout';

export default class Exception500 extends React.PureComponent {
  render() {
    return <Exception type={500} />;
  }
}
