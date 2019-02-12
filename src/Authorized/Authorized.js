import checkPermissions from './checkPermissions';

const Authorized = ({ children, authority, noMatch = null }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  return checkPermissions(authority, childrenRender, noMatch);
};
Authorized.check = checkPermissions;
export default Authorized;
