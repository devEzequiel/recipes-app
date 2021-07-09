import React from "react";
import { RATES_GET, RECIPES_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./Recipes.module.css";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = React.useState(null);
  const token = window.localStorage.getItem("token");
  const { request } = useFetch();

  React.useEffect(() => {
    getRates();
    getRecipes();
  }, []);

  async function getRecipes() {
    const { url, options } = RECIPES_GET(token);
    const { response, json } = await request(url, options);
    if (response.ok && json.data) {
      setRecipes(json.data);
      
    } else {
      setRecipes(null);
    }
  }


  async function getRates() {
    const { url, options } = RATES_GET(token);
    const { response, json } = await request(url, options);
    if (response.ok && json.data) {
      setRecipes(json.data);
      console.log(json)
    } else {
      setRecipes(null);
    }
  }

  return (
    <div className={styles.content}>
      <h1>Receitas</h1>
      {recipes &&
        recipes.map((recipe, i) => {
          return (
            <div className={styles.recipes} key={i}>
              <Link to={`/receitas/${recipe.id}`}>
                <p className={styles.name}>{recipe.name}</p>
              </Link>
              <div className={styles.image}>
                {recipe.image ? (
                  <img>A</img>
                ) : (
                  <p>Modo de preparo: {recipe.details}</p>
                )}
              </div>
              <div>
                <h4>Avaliação</h4>
                <span className={`fa fa-star ${styles.checked}`} />
                <span className={`fa fa-star ${styles.checked}`} />
                <span className={`fa fa-star ${styles.checked}`} />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </div>
              <div className={styles.openRecipe}>
                <Link to={`/receitas/${recipe.id}`}>Abrir</Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Recipes;
