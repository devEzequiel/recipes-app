import React from "react";

const Recipes = () => {
  const [recipes, setRecipes] = React.useState(null);

  React.useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    const { url, options } = RECIPES_GET(token, pageNumber);
    const { response, json } = await request(url, options);
    if (response.ok && json.data) {
      // let foo  = new Array(json.meta.last_page)

      json.data && setRecipes(json.data);
    } else {
      setProperties(null);
    }
  }

  return (
    <div>
      <h1>Ok</h1>
    </div>
  );
};

export default Recipes;
