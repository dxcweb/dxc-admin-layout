import React from 'react';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';

import Menu from "antd/lib/menu";
import "antd/lib/menu/style/index.less";
import Icon from "antd/lib/icon";
import "antd/lib/icon/style/index.less";
import urlToList from '../utils/urlToList';
import Link from 'umi/link';

const { SubMenu } = Menu;

const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" style={{ marginRight: 10, width: 14 }} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMenuMatches = (flatMenuKeys, path) =>
  flatMenuKeys.filter((item) => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });

export default class BaseMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getSelectedMenuKeys = memoizeOne(this.getSelectedMenuKeys);
    this.flatMenuKeys = props.flatMenuKeys;
  }

  // Get the currently selected menu
  getSelectedMenuKeys = (pathname) => {
    return urlToList(pathname).map((itemPath) => getMenuMatches(this.flatMenuKeys, itemPath).pop());
  };

  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { pathname } = this.props;
    return (
      <Link to={itemPath} target={target} replace={itemPath === pathname}>
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  getSubMenuOrItem = (item) => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some((child) => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  checkPermissionItem = (authority, ItemDom) => {
    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => item.name && !item.hideInMenu && item.permission)
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem(item, parent);
        return ItemDom;
      })
      .filter((item) => item);
  };

  render() {
    const { handleOpenChange, pathname, openKeys, menuData } = this.props;
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [ openKeys[openKeys.length - 1] ];
    }
    let props = {};
    if (openKeys) {
      props = {
        openKeys
      };
    }
    return (
      <Menu mode="inline" theme="dark" onOpenChange={handleOpenChange} selectedKeys={selectedKeys} {...props}>
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}
