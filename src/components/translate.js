import React, { useState, useEffect } from "react";
import { Icon, Form, TextArea } from "semantic-ui-react";
import axios from "axios";

export default function Translate() {
  const [LanguageList, setLanguageList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const translateText = () => {
    setResultText(inputText);
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguageList(response.data);
    });
  }, []);
  return (
    <div>
      {/* App Header */}
      <div className="app-header">
        <h1 className="header">
          Translate any popular books to a <i id="naija">Nigerian Language</i>
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
            <select class="ui dropdown">
              <option value="">Select Language</option>
              {LanguageList.map((language) => {
                return <option>{language.name}</option>;
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
      </footer>
    </div>
  );
}
