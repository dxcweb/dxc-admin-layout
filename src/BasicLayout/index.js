import React from "react";
import DocumentTitle from "react-document-title";
import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";
import orderBy from "lodash/orderBy";
import pathToRegexp from "path-to-regexp";
import Breadcrumb from "./Breadcrumb";
import SiderMenu from "../SiderMenu/SiderMenuWrapper";
import checkPermissions from "../Authorized/checkPermissions";
import Block from "dxc-flex";
import Menu from "antd/lib/menu";
import "antd/lib/menu/style/index.less";
import Icon from "antd/lib/icon";
import "antd/lib/icon/style/index.less";
import Dropdown from "antd/lib/dropdown";
import "antd/lib/dropdown/style/index.less";
import Layout from "antd/lib/layout";
import "antd/lib/layout/style/index.less";

import "../../assets/BasicLayout.less";
import Exception from "../Exception/Exception";
import is from "is_js";
const isMobile = is.mobile();
const { Sider } = Layout;
// Conversion router to menu.
function formatter(data, parentAuthority) {
  const arr = data
    .map((item) => {
      if (!item.path) {
        return null;
      }
      const authority = item.authority || parentAuthority;
      const result = {
        ...item,
        name: item.name,
        authority,
        sort: item.sort || 1,
        permission: checkPermissions(authority, true, false),
      };
      if (item.routes) {
        const children = formatter(item.routes, authority);
        // Reduce memory usage
        if (children.length === 0) {
          return null;
        }
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter((item) => item);
  return orderBy(arr, ["sort"]);
}

export default class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.getMenuData = memoizeOne(this.getMenuData);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  getMenuData() {
    const {
      route: { routes },
    } = this.props;
    const data = formatter(routes);
    return data;
  }
  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = (data) => {
      data.forEach((menuItem) => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = (pathname) => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find((key) => pathToRegexp(key).test(pathname));
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = (pathname) => {
    const { siteName } = this.props;
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData || !currRouterData.name) {
      return siteName;
    }
    const name = currRouterData.name;
    return `${name}`;
  };
  toggleCollapsed = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };
  onCollapse = (collapsed) => {
    setTimeout(() => {
      this.setState({ collapsed });
    }, 200);
  };
  onMyMenuClick = ({ key }) => {
    const { onLogout } = this.props;
    if (key === "logout") {
      onLogout && onLogout();
    }
  };
  myMenu = () => {
    const { renderDropdownMenu } = this.props;
    return (
      <Menu style={{ minWidth: 130 }} selectedKeys={[]} onClick={this.onMyMenuClick}>
        {renderDropdownMenu ? renderDropdownMenu() : null}
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
  };
  render() {
    const {
      children,
      location: { pathname },
      username,
      logo,
    } = this.props;
    const { collapsed } = this.state;
    const currRouterData = this.matchParamsPath(pathname);
    let leftWidth,
      siderStyle = {};
    if (isMobile) {
      leftWidth = "100%";
      siderStyle = {
        transform: collapsed ? "translateX(-140%)" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
      };
    } else {
      leftWidth = !collapsed ? "calc(100% - 230px)" : "calc(100% - 80px)";
    }
    return (
      <DocumentTitle title={this.getPageTitle(pathname)}>
        <Block>
          {isMobile && !collapsed ? (
            <div
              onClick={this.toggleCollapsed}
              style={{ background: "rgba(0,0,0,.65)", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, opacity: 0.3 }}
            />
          ) : null}
          <Sider
            style={{
              minHeight: "100vh",
              boxShadow: "2px 0  6px rgba(0, 0, 0, 0.2)",
              ...siderStyle,
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={this.onCollapse}
            width={230}
          >
            <Block
              horizontal="center"
              vertical="center"
              style={{ fontSize: 18, height: 48, color: "#fff", borderBottom: "1px solid #676767" }}
            >
              {logo}
            </Block>
            <SiderMenu collapsed={collapsed} pathname={pathname} menuData={this.getMenuData()} />
          </Sider>
          <Block layout="vertical" style={{ width: leftWidth }}>
            <Block vertical="center" style={{ height: 48, boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)" }}>
              <Block vertical="center" style={{ flex: 1 }}>
                <Icon
                  style={{ fontSize: 17, cursor: "pointer", margin: "0 20px" }}
                  type={collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggleCollapsed}
                />
                <Breadcrumb pathname={pathname} breadcrumbNameMap={this.breadcrumbNameMap} />
              </Block>
              <Dropdown placement="bottomCenter" overlay={this.myMenu()}>
                <Block vertical="center" style={{ height: "100%", marginRight: 30, cursor: "pointer" }}>
                  {username}
                  <Icon style={{ marginLeft: 5 }} type="down" />
                </Block>
              </Dropdown>
            </Block>
            {currRouterData ? (
              currRouterData.permission ? (
                <div style={{ padding: "15px 20px", flex: 1, background: "rgba(0, 0, 0, 0.04)" }}>{children}</div>
              ) : (
                <Exception type={403} />
              )
            ) : (
              children
            )}
          </Block>
        </Block>
      </DocumentTitle>
    );
  }
}
