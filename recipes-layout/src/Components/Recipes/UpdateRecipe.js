import React from "react";
import { RECIPE_GET, RECIPE_PUT } from "../../api";
import Input from "../Forms/Input";
import TextArea from "../Forms/Textarea";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import styles from "./Recipes.module.css";

const UpdateRecipe = () => {
  const [name, setName] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [image, setImage] = React.useState("");
  //   const [error, setError] = React.useState(null);
  const { loading, request } = useFetch();

  //   const [isCreated, setIsCreated] = React.useState(false);
  const token = window.localStorage.getItem("token");

  //return id from url
  const getId = () => {
    let url = window.location.pathname;
    let id = url.split("/");
    return id[2];
  };

  React.useEffect(() => {
    getProperty();
  }, []);

  async function getProperty() {
    let id;
    id = getId();
    const { url, options } = RECIPE_GET(id, token);
    const { json } = await request(url, options);

    console.log(json);
    setName(json.data.name);
    setIngredients(json.data.ingredients);
    setDetails(json.data.details);
    setImage(json.data.image);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = RECIPE_PUT(
      {
        name: name.value,
        details: details.value,
        ingredients: ingredients.value,
        image: image.value,
      },
      token
    );

    //   setError(null);

    const { response } = await request(url, options);

    if (response.ok) {
      window.alert("Receita atualizada com sucesso!");
      // setIsCreated(true);
    } else {
      // setError("Dados Inválidos");
    }
  }

  return (
    <div className={styles.content}>
      <h1>Atualizar Receita</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Nome da Receita"
          name="name"
          placeholder="Digite o nome da receita"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextArea
          id="ingredients"
          label="Lista de Ingredientes"
          {...ingredients}
          placeholder="Ingredientes"
          value={ingredients}
          onChange={({ target }) => setIngredients(target.value)}
        />
        <TextArea
          id="details"
          label="Modo de preparo"
          {...details}
          placeholder="Escreva o modo de preparo"
          value={details}
          onChange={({ target }) => setDetails(target.value)}
        />

        <Input
          type="file"
          id="image"
          label="Editar imagem da receita (opcional)"
          value={image}
          onChange={({ target }) => setImage(target.value)}
        />

        {loading ? (
          <Button value="Carregando..." style={{ cursor: "wait" }} disabled />
        ) : (
          <Button value="Atualizar" />
        )}
      </form>
    </div>
  );
};

export default UpdateRecipe;
