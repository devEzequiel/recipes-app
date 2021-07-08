import React from "react";
import { RECIPES_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./Recipes.module.css";
import { Container, Row, Col } from "react-bootstrap";

const Recipes = () => {
  const [recipes, setRecipes] = React.useState(null);
  const token = window.localStorage.getItem("token");
  const { request } = useFetch();

  React.useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    const { url, options } = RECIPES_GET(token);
    const { response, json } = await request(url, options);
    if (response.ok && json.data) {
      // let foo  = new Array(json.meta.last_page)
      setRecipes(json.data);
      console.log(json);
    } else {
      setRecipes(null);
    }
  }

  return (
    <div className="home">
      <h2 className={styles.title}>Imovéis Cadastrados</h2>
      <div className={styles.propertyDiv}></div>
      {recipes && (
        <div className={styles.pagination}>
          <Container fluid>
            <Row>
              <Col>talia</Col>
            </Row>
            <Row>
              <Col>talia</Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Recipes;
