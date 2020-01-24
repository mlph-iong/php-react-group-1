import React, { useState } from "react";
import { Button, FormControl, Form } from "react-bootstrap";
import "./Registration.css";

export default function Registration(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
  
    return (
        
      <div className="Registration">
        <h3>Registration</h3>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <Button block disabled={!validateForm()} type="submit">
            Register
          </Button>
        </form>
      </div>
    );
  }