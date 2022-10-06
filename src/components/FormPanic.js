import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FormPanic = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    latitude: "",
    longitude: "",
    panicDetails: "",
    details: "",
  });

  const inputChangeHandler = (event) => {
    const newData = { ...data };
    newData[event.target.id] = event.target.value;
    setData(newData);
    console.log(newData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/listsPanics", {
      setData: {
        latitude: data.latitude,
        longitude: data.longitude,
        panicDetails: data.panicDetails,
        details: data.details,
      },
    });
  };

  return (
    <div>
      <Container>
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
        </Form>
      </Container>
    </div>
  );
};

export default FormPanic;
