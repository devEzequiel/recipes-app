import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <i className="fas fa-hamburger" />
      Receitas
      <nav className={`${styles.nav} container`}>
        <div>
          <Link className={styles.links} to="/">
            Todas as receitas
          </Link>

          <Link className={styles.links} to="/receitas/criar">
            Criar Receita
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
