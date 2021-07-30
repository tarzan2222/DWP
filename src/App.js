import React, { useState } from "react";

import "./App.css";
import Client from "./Client";
import Card from "./UI/Card";

const startMessage =
  "Click button to retrieve results";

function App() {
  // state management
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [message, setMessage] = useState(startMessage);

  // construct search url & params from form data
  const clickHandler = () => {
    setIsFormSubmitted(true);
      setMessage("Results Below");
  };

  // displays button and start message, or (when button clicked) results only
  return (
    <div className="App">
      <Card>
        {!isFormSubmitted && <button onClick={clickHandler}>Get Results</button>}
        <div className="message">{message}</div>
      </Card>
      <br />
      {isFormSubmitted && (
        <Client onSetMessage={setMessage} />
      )}
    </div>
  );
}

export default App;
