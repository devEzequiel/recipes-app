import React from "react";
import { RATE_POST, RECIPE_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./Recipes.module.css";

const ShowRecipe = () => {
  const [recipe, setRecipe] = React.useState(null);
  const { request } = useFetch();
  const token = window.localStorage.getItem("token");
  const [email, setEmail] = React.useState("");
  const [rate, setRate] = React.useState("");

  const getId = () => {
    let url = window.location.pathname;
    let id = url.split("/");
    return id[2];
  };

  React.useEffect(() => {
    getRecipe();
  }, []);
  async function getRecipe() {
    let id;
    id = getId();
    //   console.log(id)
    const { url, options } = RECIPE_GET(id, token);
    const { response, json } = await request(url, options);
    console.log(json);
    if (response.ok && json.data) {
      setRecipe(json.data);
    } else {
      setRecipe(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let id;
    id = getId();
    const { url, options } = RATE_POST({
        rate,
        email,
        id,
    }, token);
    const { response, json } = await request(url, options);
    console.log(json);
    if (response.ok && json.data) {
      setRecipe(json.data);
    } else {
      setRecipe(null);
    }

  }

  return (
    recipe && (
      <div className={styles.recipeContainer}>
        <h3 className={styles.recipeName}>{recipe.name}</h3>
        <div className={styles.ingredients}>
          <h4>Ingredientes: </h4>
          {recipe.ingredients}
        </div>
        <div className={styles.details}>
          <h4>Modo de preparo: </h4>
          {recipe.details}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.rateDiv}>
            <h5 >Avalie essa receita</h5>
            <select name="rate" id="rate" className={styles.selectRate} onChange={({ target }) => setRate(target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="email" placeholder="digite seu email" onChange={({ target }) => setEmail(target.value)} />

            <button>Votar</button>
          </div>
        </form>
      </div>
    )
  );
};

export default ShowRecipe;