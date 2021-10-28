import React from 'react';
import SiderMenu from './SiderMenu';

const getFlatMenuKeys = (menuData) => {
  let keys = [];
  menuData.forEach((item) => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};

export default class SiderMenuWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
  }
  render() {
    return <SiderMenu {...this.props} flatMenuKeys={this.flatMenuKeys} />;
  }
}
