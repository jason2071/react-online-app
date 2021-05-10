import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL, headers } from "../../constants";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const schema = yup.object().shape({
  name: yup.string().required("Please Enter your name"),
  email: yup
    .string()
    .required("Please Enter your email")
    .email("Please Enter Valid Email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .min(3, "Password 3 or more characters"),
});

const RegisterPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const url = BASE_URL + "/register";
      const resp = await axios.post(url, data, headers);
      addToast(resp.data.message, { appearance: "success" });
      history.replace("/login");
    } catch (error) {
      addToast(error.response.data.message, { appearance: "error" });
      if (error.response.data.errors.email.length > 0) {
        error.response.data.errors.email.map((item) =>
          addToast(item, { appearance: "error" })
        );
      }
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h3>Register</h3>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name")}
                  isInvalid={errors.name ? true : false}
                />

                {errors.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email")}
                  isInvalid={errors.email ? true : false}
                  autoComplete="email"
                />

                {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password")}
                  isInvalid={errors.password ? true : false}
                  autoComplete="password"
                />

                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
