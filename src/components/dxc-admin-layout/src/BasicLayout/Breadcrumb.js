import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import Breadcrumb from 'antd/lib/breadcrumb';
import 'antd/lib/breadcrumb/style/index.less';
import urlToList from '../utils/urlToList';

export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};
export default class BreadcrumbView extends React.PureComponent {
  state = {
    breadcrumb: null,
  };
  componentDidMount() {
    this.getBreadcrumbDom();
  }

  componentDidUpdate(preProps) {
    const { pathname } = this.props;
    if (!pathname) {
      return;
    }
    const prePathname = preProps.pathname;
    if (prePathname !== pathname) {
      this.getBreadcrumbDom();
    }
  }

  conversionBreadcrumbList = () => {
    const { pathname, breadcrumbNameMap } = this.props;
    const pathSnippets = urlToList(pathname);

    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }
      const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component && !currentBreadcrumb.nonLinkable;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {isLinkable ? <Link to={url}>{currentBreadcrumb.name}</Link> : <span>{currentBreadcrumb.name}</span>}
        </Breadcrumb.Item>
      ) : null;
    });

    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key='home'>
        <Link to='/'>首页</Link>
      </Breadcrumb.Item>,
    );
    return <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>;
  };
  urlToList(url) {
    const urllist = url.split('/').filter((i) => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
  }

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb,
    });
  };
  render() {
    return this.state.breadcrumb;
  }
}
