import React from "react";
import urlToList from "../utils/urlToList";
import BaseMenu, { getMenuMatches } from "./BaseMenu";

/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
const getDefaultCollapsedSubMenus = props => {
  const { pathname, flatMenuKeys } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item);
};

export default class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pathname: props.pathname,
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname } = state;
    if (props.pathname !== pathname) {
      return {
        pathname: props.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }
  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };
  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { collapsed } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    return (
      <div>
        <BaseMenu
          {...this.props}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          style={{ padding: "16px 0", width: "100%" }}
          {...defaultProps}
        />
      </div>
    );
  }
}
