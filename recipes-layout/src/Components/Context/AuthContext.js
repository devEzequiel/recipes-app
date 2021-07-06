import React, { createContext, useContext } from "react";
import { AUTH_POST } from "../../api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  //funcao para armazenar o erro de login
  const [loginError, setLoginError] = React.useState(null);
  const [loginRedirect, setLoginRedirect] = React.useState(false);
  const [logoutRedirect, setLogoutRedirect] = React.useState(false);

  //função para fazer o logout
  //   const userLogout = React.useCallback(async function () {
  //     setUser(null);
  //     setError(null);
  //     setLoading(false);
  //     setLogin(false);
  //     setLoginRedirect(false);
  //     setLogoutRedirect(true);
  //   }, []);

  //recupera os dados do user, através do envio do token
  //   async function getUser(token) {
  //     const { url, options } = USER_GET(token);
  //     const response = await fetch(url, options);
  //     const json = await response.json();
  //     setUser(json);
  //     setLogin(true);
  //   }

  //faz o login -_-
  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      setLoginError(false);

      const { url, options } = AUTH_POST({ email, password });
      const response = await fetch(url, options);

      console.log(response);
      const json = await response.json();
      // console.log(json.data.token)
      // if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      // const { token } = await response.json();
      window.localStorage.setItem("token", json.data.token);
      // await getUser(token);

      setLoginRedirect(true);
    } catch (err) {
      setError(err.message);
      setLogin(false);
      setLoginError("Dados incorretos");
    } finally {
      setLoading(false);
    }
  }

  //   React.useEffect(() => {
  //     async function autoLogin() {
  //       const token = window.localStorage.getItem("token");
  //       if (token) {
  //         try {
  //           setError(null);
  //           setLoading(true);
  //           const { url, options } = TOKEN_VALIDATE_POST(token);
  //           const response = await fetch(url, options);
  //           if (!response.ok) throw new Error("Token inválido");
  //           await getUser(token);
  //         } catch (err) {
  //           userLogout();
  //         } finally {
  //           setLoading(false);
  //         }
  //       } else {
  //         setLogin(false);
  //         console.log("nao tem")
  //       }
  //     }
  //     autoLogin();
  //   }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        // userLogout,
        userLogin,
        loginError,
        user,
        error,
        loading,
        login,
        loginRedirect,
        logoutRedirect,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
