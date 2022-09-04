import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [lenguajes, setLenguajes] = useState([]);
  let [inputValue, setInputValue] = useState("");
  let [outputValue, setOutputvalue] = useState("");

  const desde = useRef(null);
  const a = useRef(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
    };

    fetch("https://text-translator2.p.rapidapi.com/getLanguages", options)
      .then((response) => response.json())
      .then((response) => {
        setLenguajes(response.data.languages);
      })
      .catch((err) => console.error(err));
  }, []);

  const traducir = async (e) => {
    e.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", desde.current.value);
    encodedParams.append("target_language", a.current.value);
    encodedParams.append("text", inputValue);

    console.log(encodedParams);

    const options2 = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://text-translator2.p.rapidapi.com/translate", options2)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setOutputvalue(response.data.translatedText);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <div className="languages-container">
        <label htmlFor="selectLanguagesFrom">Traducir del:</label>
        <select ref={desde} name="languagesFrom" id="selectLanguagesFrom">
          {lenguajes
            ? lenguajes.map((e) => (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              ))
            : null}
        </select>

        <label htmlFor="selectLanguagesFrom">al:</label>
        <select ref={a} name="languagesTo" id="selectLanguagesTo">
          {lenguajes
            ? lenguajes.map((e) => (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              ))
            : null}
        </select>
      </div>
      <div className="traductores">
        {/* <div className="container "> */}

        <form action="" id="formTraduce">
          <div className="traductor1">
            <label className="label1" htmlFor="text">
              Ingresa el texto a traducir:{" "}
            </label>
            <textarea
              className="textarea1"
              name="text"
              id="text"
              cols="30"
              rows="10"
              onChange={(event) => setInputValue(event.target.value)}
            ></textarea>
            <button className="boton" onClick={(e) => traducir(e)}>
              {" "}
              traducir
            </button>
          </div>
        </form>

        <div className="traductor2">
          <label className="label2" htmlFor="Result">
            Resultado:
          </label>
          <textarea
            className="textarea2"
            name="result"
            id="result"
            cols="30"
            rows="10"
            value={outputValue ? outputValue : ""}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
