import axios from "axios";
import { useEffect, useState } from "react";

const config = {
  method: "get",
  url: "http://192.168.8.158:8000/api/panics",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

const ListsPanics = () => {
  const [panics, setPanics] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    axios(config)
      .then(function (response) {
        console.log(response);
        setPanics(response.data.data.panics);
      })
      .catch((err) => {
        setError(err);
        console.log(err.message);
      });
  }, []);

  return <h2>silly us</h2>;
};

export default ListsPanics;
