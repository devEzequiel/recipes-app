import React from "react";
import { Link } from "react-router-dom";
import { styles } from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        Receitas
        {/* se estiver logado aparece o botão de logout */}
        <div>
          <Link className={`${styles.links} active`} to="/imoveis/criar">
            Adicionar Imóvel
          </Link>
          <Link className={styles.links} to="/imoveis/salvos">
            Imóveis Salvos
          </Link>
        </div>
        ):(
        <div>
          <Link className={styles.login}>Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
