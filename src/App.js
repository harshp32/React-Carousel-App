import React, { useState, useEffect } from "react";
import Slider from "./components/Slider";
import axios from "axios";
import "./css/App.css";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=Iron&apikey=${api_key}&page=1`)
      .then((response) => {
        setData(response.data.Search);
      });
  },[]);

  return (
    <div className="app">
      <div className="heading">
        <h2>Demonstrating carousel</h2>
      </div>
      <Slider values={data} />
    </div>
  );
};

export default App;
