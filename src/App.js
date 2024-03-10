import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./App.css";

const KEY = "2f9538ac1388ab59893c0f4dc87a5c6a";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const inputRef = useRef();

  const fetchData = async () => {
    if (city !== "") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`
        );
        setData(response.data);
        setCity("");
      } catch (err) {
        toast.warn("Please enter valid city name");
      }
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  });
  // const inputClick =() => inputRef.current.focus();

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="menu">
        <div className="main">
          <div>
            <h1>Weather</h1>
            <input
              ref={inputRef}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchData}>Click</button>
          </div>
          <div>
            {data ? (
              <div>
                <h2>
                  {data.name},{data.sys.country}
                </h2>
                <div>
                  <div>{data.main.temp}C</div>
                  <div>{data.coord.lat}</div>
                  <div>{data.coord.lon}</div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
