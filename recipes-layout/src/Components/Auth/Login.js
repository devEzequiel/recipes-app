import React from "react";
import styles from "./Login.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/AuthContext";
import useForm from "../../Hooks/useForm";

const Login = () => {
  const email = useForm("email");
  const password = useForm();

  const { userLogin, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    userLogin(email.value, password.value);
  }
  return (
    <div className={styles.content}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          id="email"
          placeholder="email@example.com"
          label="Digite seu email"
          {...email}
        />

        <Input
          type="password"
          id="password"
          placeholder="senha"
          label="Digite sua senha"
          {...password}
        />

        {loading ? (
          <Button value="Carregando..." style={{ cursor: "wait" }} />
        ) : (
          <Button value="Entrar" />
        )}

        <Link to="signup" className={styles.create}>
          Criar conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
