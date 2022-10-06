import React, { useState, useEffect } from "react";
import { Icon, Form, TextArea } from "semantic-ui-react";
import axios from "axios";

export default function Translate() {
  const [LanguageList, setLanguageList] = useState([]);
  const [selectedLanguageKey, setLanguageKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [detectedLangKey, setLangKey] = useState("");

  const getLanguageSource = () => {
    // prettier-ignore
    axios.post(`https://libretranslate.de/detect`, { 
      q : inputText 
    })
    .then((response) => {
          setLangKey(response.data[0].language);
        });
  };
  const translateText = () => {
    setResultText(inputText);
    getLanguageSource();
    // prettier-ignore
    let data = {
      q: inputText,
      source: detectedLangKey,
      target: selectedLanguageKey
    };
    axios.post(`https://libretranslate.de/translate`, data).then((response) => {
      setResultText(response.data.translatedText);
    });
  };

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguageList(response.data);
    });
    getLanguageSource();
  }, [inputText]);
  return (
    <div>
      {/* App Header */}
      <div className="app-header">
        {/* <h1 className="header">
          Translate any popular books to a <i id="naija">Nigerian Language</i>
        </h1> */}
        <h1 className="header">
          Translate text to any<i id="naija"> Language</i>
        </h1>
      </div>

      {/* App Body */}
      <div className="app-body">
        <div>
          <Form>
            {/* Input Field */}
            <Form.Field
              control={TextArea}
              // label="Input the Book here"
              placeholder="Enter text to be translated"
              onChange={(e) => setInputText(e.target.value)}
            />
            <br />

            {/* Language selection */}
            <select class="ui dropdown" onChange={languageKey}>
              <option value="">Select Language</option>
              {LanguageList.map((language) => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>
            <br />
            <br />

            {/* Output Field */}
            <Form.Field
              control={TextArea}
              // label="Input the Book here"
              placeholder="translated text"
              value={resultText}
            />
            <button
              onClick={translateText}
              class="ui primary button"
              size="large"
            >
              {" "}
              <Icon name="translate" /> Translate
            </button>
          </Form>
        </div>
      </div>
      <footer className="footer">
        P.S Book translation will be available later on
        <blockquote>
          by <a href="https://github.com/Marnin-A/">Marnin_a</a>
        </blockquote>
      </footer>
    </div>
  );
}
