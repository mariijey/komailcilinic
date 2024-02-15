import { createContext, useContext, useState, ReactNode } from "react";
import { Permissions } from "types/userManagement";

interface IContext {
  permissions: Permissions[] | null;
  handlePermissions: (arg: Permissions[]) => void;
}
const Context = createContext<IContext | null>(null);

export function usePermissionsContext() {
  return useContext(Context);
}

const Provider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<Permissions[] | null>(null);

  const handlePermissions = (arg: Permissions[]) => {
    setPermissions(arg);
  };

  return (
    <Context.Provider
      value={{
        permissions,
        handlePermissions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;