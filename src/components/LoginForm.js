import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

const Forms = () => {
  const navigate = useNavigate();

  const url = "http://192.168.8.158:8000/api/login";
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const inputHandler = (event) => {
    const newData = { ...data };
    newData[event.target.id] = event.target.value;
    setData(newData);
    console.log(newData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Axios.post(url, {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        console.log(response.data);
        navigate("/createPanics");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container>
      {error && <div>{error}</div>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={inputHandler}
            value={data.email}
            id="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={inputHandler}
            value={data.password}
            id="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Forms;
