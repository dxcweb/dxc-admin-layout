import React from 'react';
import { Exception } from '@/components/dxc-admin-layout/src';

export default class Exception403 extends React.PureComponent {
  render() {
    return <Exception type={403} />;
  }
}
