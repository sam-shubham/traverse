import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const initialState = { user: {}, Authenticated: false, token: null };

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case "SIGN_IN": {
      if (!action.token) return { ...prevState };
      axios.defaults.headers.common["Authorization"] = `Bearer ${action.token}`;
      localStorage.setItem("token", action.token);
      return {
        ...prevState,
        token: action.token,
        Authenticated: true,
      };
    }
    case "SIGN_OUT": {
      axios.defaults.headers.common["Authorization"] = ``;
      localStorage.removeItem("token");
      return {
        user: {},
        Authenticated: false,
        token: null,
      };
    }
    case "UPDATE_USER": {
      if (action.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", action.token);
      }
      return {
        ...prevState,
        user: { ...prevState.user, ...action.user },
      };
    }
  }
};

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // const [newstate, setnewstate] = useState({});
  const [Auth, updateAuth] = React.useReducer(authReducer, initialState);
  useEffect(() => {
    if (typeof localStorage != undefined && localStorage.getItem("token")) {
      axios
        .get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((d) => {
          if (d.data?.success) {
            updateAuth({
              type: "UPDATE_USER",
              user: d.data.msg,
              Authenticated: true,
              token: localStorage.getItem("token"),
            });
          }
        });
    }
  }, [Auth?.token]);
  return (
    <AuthContext.Provider value={{ Auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
