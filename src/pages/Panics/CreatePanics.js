import Axios from "axios";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

const FormPanic = () => {
  const navigate = useNavigate();
  const url = "http://192.168.8.158:8000/api/panics";

  const [data, setData] = useState({
    latitude: "",
    longitude: "",
    panicDetails: "",
    details: "",
  });
  const [error, setError] = useState();

  const inputChangeHandler = (event) => {
    const newData = { ...data };
    newData[event.target.id] = event.target.value;
    setData(newData);
    console.log(newData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Axios.post(
      url,
      {
        latitude: data.latitude,
        longitude: data.latitude,
        panicDetails: data.panicDetails,
        details: data.details,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        navigate("/listsPanics");
      })
      .catch((err) => {
        console.log({ err });
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      <Container>
        <Navbar>
          <Container>
            <Navbar.Brand> Send Panic</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Link to="/listsPanics">
                <Button variant="primary">List Panics</Button>
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Form onSubmit={submitHandler}>
          <h2>Panic Details</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              id="latitude"
              onChange={inputChangeHandler}
              type="text"
              placeholder="Enter Latitude"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              id="Longitude"
              onChange={inputChangeHandler}
              type="text"
              placeholder="Enter Longitude"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Panic Type</Form.Label>
            <Form.Control
              id="panic"
              onChange={inputChangeHandler}
              type="text"
              placeholder="Enter Panic Type"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Details</Form.Label>
            <Form.Control
              id="details"
              type="text"
              onChange={inputChangeHandler}
              placeholder="Details"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Send Panic
          </Button>
          {error && <div>{error}</div>}
        </Form>
      </Container>
    </div>
  );
};

export default FormPanic;
