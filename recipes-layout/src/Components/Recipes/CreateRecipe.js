import React from "react";
import { RECIPE_POST } from "../../api";
import Input from "../Forms/Input";
import TextArea from "../Forms/Textarea";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import styles from "./Recipes.module.css";

const CreateRecipe = () => {
  const name = useForm();
  const ingredients = useForm();
  const details = useForm();
  const image = useForm();
  //   const [error, setError] = React.useState(null);
  const { loading, request } = useFetch();

  //   const [isCreated, setIsCreated] = React.useState(false);
  const token = window.localStorage.getItem("token");

  async function handleSubmit(event) {
    event.preventDefault();

    if (name.validate() && details.validate() && ingredients.validate()) {
      const { url, options } = RECIPE_POST(
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
        window.alert("Receita salva com sucesso!");
        // setIsCreated(true);
      } else {
        // setError("Dados Inválidos");
      }
    }
  }

  return (
    <div className={styles.content}>
      <h1>Nova Receita</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Nome da Receita"
          name="name"
          placeholder="Digite o nome da receita"
          {...name}
        />
        <TextArea
          id="ingredients"
          label="Lista de Ingredientes"
          {...ingredients}
          placeholder="Ingredientes"
        />
        <TextArea
          id="details"
          label="Modo de preparo"
          {...details}
          placeholder="Escreva o modo de preparo"
        />

        <Input
          type="file"
          id="image"
          label="Adicione uma imagem pra receita (opcional)"
        />

        {loading ? (
          <Button value="Carregando..." style={{ cursor: "wait" }} disabled />
        ) : (
          <Button value="Salvar" />
        )}
      </form>
    </div>
  );
};

export default CreateRecipe;
