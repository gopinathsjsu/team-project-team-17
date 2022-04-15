import React from "react";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

function SignInModal(props) {
  const signInEmail = useRef(null);
  const signInPassword = useRef(null);

  const registerName = useRef(null);
  const registerEmail = useRef(null);
  const registerPassword = useRef(null);

  const [register, setRegister] = useState(false);

  const validateEmail = (email) => {
    //   a valid email must have the following format:
    //   [chars]@[chars].[2+ letters]

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
  };

  const valideName = (name) => {
    //   a valid name must have the following format:
    //   [chars] [chars] [chars]
    const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return re.test(String(name));
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (
      validateEmail(signInEmail.current.value) &&
      validatePassword(signInPassword.current.value)
    ) {
      axios
        .post("http://localhost:8000/api/login", {
          email: signInEmail.current.value,
          password: signInPassword.current.value,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      alert("Invalid email or password");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      validateEmail(registerEmail.current.value) &&
      validatePassword(registerPassword.current.value) &&
      valideName(registerName.current.value)
    ) {
      axios
        .post("http://localhost:8000/api/register", {
          name: registerName.current.value,
          email: registerEmail.current.value,
          password: registerPassword.current.value,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("error");
      alert("Please fill in all the fields correctly");
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className="modal"
      title="modal"
    >
      <Modal.Header closeButton>
        {register ? (
          <Modal.Title>Register</Modal.Title>
        ) : (
          <Modal.Title>Sign in</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body title="form">
        {register ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={registerName} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={registerEmail} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={registerPassword} />
            </Form.Group>
            <Form.Text
              className="text-muted"
              onClick={() => setRegister(false)}
            >
              Already have an account? Sign in here
            </Form.Text>
            <Button
              type="button"
              className="modal-submit mt-3"
              onClick={handleRegisterSubmit}
            >
              Register
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={signInEmail} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={signInPassword} required />
            </Form.Group>
            <Form.Text className="text-muted" onClick={() => setRegister(true)}>
              Don't have an account? Register here
            </Form.Text>
            <Row>
              <Col>
                <Button
                  type="button"
                  className="modal-submit mt-3"
                  onClick={handleSignInSubmit}
                >
                  Sign in
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SignInModal;
