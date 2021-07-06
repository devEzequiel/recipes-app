export const API_URL = "http://127.0.0.1:8000/api/";

export function AUTH_POST(body) {
  return {
    url: API_URL + "auth/",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL + "users/",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body),
    },
  };
}

export function RECIPE_POST(body, token) {
  return {
    url: API_URL + "recipes/",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body),
    },
  };
}

export function RECIPES_GET() {
  return {
    url: API_URL + "recipes/",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
      },
    },
  };
}
