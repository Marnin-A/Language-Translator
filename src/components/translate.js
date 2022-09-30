import React from "react";
import { Form, TextArea } from "semantic-ui-react";
export default function Translate() {
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
            <Form.Field
              control={TextArea}
              label="Input the Book here"
              placeholder="Enter text to be translated"
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
