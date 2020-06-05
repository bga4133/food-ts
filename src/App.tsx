import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./styles/App.css";

//types
type FormElement = React.FormEvent<HTMLFormElement>;
type onChangeInput = React.ChangeEvent<HTMLInputElement>;

//interfaces
interface IRecipes {
  recipe: string;
  label: string;
  image: string;
  url: string;
  ingredients: string;
}

function App(): JSX.Element {
  //states
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<IRecipes[]>([]);
  const [alert, setAlert] = useState<string>("");

  //api key
  const APP_ID: string = "4e9f05eb";
  const APP_KEY: string = "9b904d703fa0d46a88ce1ac63f29f498";

  const url: string = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //getdata function
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Plase fill the form");
    }
  };
  const onChange = (e: onChangeInput) => {
    setQuery(e.target.value);
    console.log(query);
    getData();
  };

  const onSubmit = (e: FormElement) => {
    e.preventDefault();
    console.log("Hila");
  };
  return (
    <div className="app">
      <h1>Food search app</h1>
      <form action="" className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes"></div>
    </div>
  );
}

export default App;
