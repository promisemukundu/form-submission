import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => fetchPanics(), []);

  const fetchPanics = () => {
    axios(config)
      .then(function (response) {
        console.log(response);
        setPanics(response.data.data.panics);
      })
      .catch((err) => {
        console.log({ err });
        setError(err.response.data.message);
      });
  };

  const deleteButtonHandler = (id) => {
    return (event) => {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this"
      );
      if (shouldDelete) {
        axios({
          ...config,
          method: "post",
          url: `http://192.168.8.158:8000/api/panics/${id}`,
        }).then((response) => fetchPanics());
      }
    };
  };

  const sendPanicHandler = () => {
    navigate("/createPanics");
  };

  return (
    <Container>
      <Navbar>
        <Container>
          <Navbar.Brand>Panics</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={sendPanicHandler} variant="primary">
              Send Panic
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Created by</th>
            <th scope="col">Created at</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Panic Type</th>
            <th scope="col">Details</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {panics.map((panic) => {
            return (
              <tr key={panic.id}>
                <td>{panic.created_by.name}</td>
                <td>{panic.created_at}</td>
                <td>{panic.latitude}</td>
                <td>{panic.longitude}</td>
                <td>{panic.panic_type}</td>
                <td>{panic.details}</td>
                <td>
                  <Button
                    onClick={deleteButtonHandler(panic.id)}
                    variant="outline-danger"
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {error && <div>{error}</div>}
      </table>
    </Container>
  );
};

export default ListsPanics;
