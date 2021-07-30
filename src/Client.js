import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Client.css"

const Client = (props) => {
  //manage states
  const [searchResults, setSearchResults] = useState();
  const [isLoading, setIsLoading] = useState(true);

  var url1 = "http://localhost:8000/london";
  var url2 = "http://localhost:8000/near-london";

  // rerender only when needed
  useEffect(() => {
    setSearchResults([]);
    // get those based in London ...
    axios
      .get(`${url1}`)
      .then((res) => {
        setSearchResults(res.data);
      })
      .then(() => {
        // ...and add those within 50 miles of London
        axios.get(`${url2}`).then((res) => {
          setSearchResults((prevSearchResults) => [
            ...prevSearchResults,
            ...res.data,
          ]);
          setIsLoading(false);
        });
      });
  }, [url1, url2]); 

   if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        List of people located in, or within 50 miles of, London:
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              [ID:{user.id}] {user.first_name} {user.last_name} - {user.distance}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
};

export default Client;
