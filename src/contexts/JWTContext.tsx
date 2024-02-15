import React, { createContext } from "react";

// reducer - state management
// project import
import { JWTContextType, LoginRequest } from "types/auth";
import {
  useLoginPostMutation,
  useLazyGetMeQuery,
  useLogoutMutation,
} from "store/api/auth";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { saveUser } from "store/reducers/menu";

export const setSession = (access_token: string | null) => {
  if (access_token) {
    localStorage.setItem("token", access_token);
    localStorage.setItem("isLoggedIn", "true");
  } else {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginPost] = useLoginPostMutation();
  const [getMeRequest] = useLazyGetMeQuery();
  const [logoutRequest] = useLogoutMutation();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const login = async (data: LoginRequest) =>
    loginPost(data)
      .unwrap()
      .then((res: any) => {
        setSession(res.data.accessToken);
        navigate("/dashboard");
        return res;
      });

  const getMe = async () => {
    await getMeRequest()
      .unwrap()
      .then((res: any) => {
        const roles = res.data.roles[0];
        const permissions = roles.permissions.map((per: any) => per.id);
        const user = res.data;
        dispatch(saveUser({ userInfo: user, userAccess: permissions }));
        return res;
      });
  };

  const logout = async () => {
    await logoutRequest()
      .unwrap()
      .then((res: any) => {
        dispatch(saveUser({ userInfo: null, userAccess: null }));
        setSession(null);
        navigate("/login");
        return res;
      });
  };

  return (
    <JWTContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        getMe,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
