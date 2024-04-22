import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [visible, setVisible] = useState("none");

  useEffect(() => {
    fetch("/check")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the backendData state with the data received from the API
        setBackendData(data);
        console.log("Data received from API:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function listItemClicked() {
    console.log("clicked");
  }

  function loadBook() {
    return;
  }

  function renderItems() {
    return backendData.map((backendData, i) => {
      return (
        <li className="button-list" key={i} onClick={() => listItemClicked()}>
          items rendered from server {backendData.chat}
        </li>
      );
    });
  }

  function title_click() {
    console.log("title clicked");
    setVisible("block");
    console.log(visible);
  }

  function button_click() {
    console.log("button clicked");
  }
  //return react html to serve to webpage
  return (
    <>
      <ul class="buttons">
        <a href="map.html">Map</a>
        <a href="pic.html">Pics</a>
        <a href="countDown.html">Count Down</a>
      </ul>

      <h5 className="main-page" onClick={() => title_click()}>
        {" "}
        Happy 1 Year!
      </h5>

      <button
        style={{ display: visible }}
        id="start"
        onClick={() => button_click()}
      >
        {" "}
        Click ME
      </button>

      {backendData.length === 0 ? (
        <p>loading..</p>
      ) : (
        <p>data has been loaded</p>
      )}

      <ul className="buttons">{renderItems()}</ul>
      <label htmlFor="input-file" id="input-file-label">
        Click Me To Add picture{" "}
      </label>

      <input
        type="file"
        accept="image/jpeg,image/png, image/jpg"
        id="input-file"
      />
    </>
  );
}

export default App;
