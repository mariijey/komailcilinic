import React from "react";
import { useSelector } from "react-redux";
// types
import { AccessProps, GuardProps } from "types/auth";
import { MenuProps } from "types/menu";
// ==============================|| AUTH GUARD ||============================== //

const hasAccess = (accessRoles?: number[], userRoles?: number[]) => {
  if ((accessRoles?.length && !userRoles?.length) || !accessRoles?.length) {
    return false;
  }
  return accessRoles?.some((r) => userRoles?.some((r2) => r === r2));
};

const AccessGuard = ({ access, children }: AccessProps & GuardProps) => {
  const userAccess = useSelector(
    (state: { menu: MenuProps }) => state.menu.userAccess
  );
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) return null;
  if (!access) return children;
  else {
    const accessGranted = hasAccess(access.roles, userAccess.roles);

    if (!accessGranted) return null;

    return children;
  }
};

export default AccessGuard;

/**
 * A public higher-order component to access the imperative API
 */
export const makeAccessGuard =
  <P extends object>(
    WrappedComponent: React.ComponentType<P> | React.FunctionComponent<P>,
    { access }: AccessProps
  ): React.FC<P> =>
  (props) =>
    (
      <AccessGuard access={access}>
        <WrappedComponent {...props} />
      </AccessGuard>
    );

export const withAccessGuard =
  <P extends object>(
    WrappedComponent: React.ComponentType<P> | React.FunctionComponent<P>
  ): React.FC<P & AccessProps> =>
  ({ access, ...props }) => {
    return (
      <AccessGuard access={access}>
        <WrappedComponent {...(props as P)} />
      </AccessGuard>
    );
  };

export const HasAuthorization = ({ access }: AccessProps) => {
  let accessGranted = false;
  const permissions = localStorage.getItem("permissions");
  const resource_access = permissions && JSON.parse(permissions);

  // if (!isLoggedIn) return accessGranted;

  if (!access) return accessGranted;

  accessGranted = Object.keys(access).some((key) => {
    // if (key === 'roles') {
    //   return access?.roles ? hasAccess(access?.roles, realm_access?.roles) : true;
    // } else {
    // @ts-ignore
    return hasAccess(access[key]?.roles, resource_access[key]?.roles);
    // }
  });

  return accessGranted;
};
