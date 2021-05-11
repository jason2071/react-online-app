import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL, headers } from "../../constants";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { useDispatch } from "react-redux";
import { updateToken, updateProfile } from "../../redux/actions/profile.action";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please Enter your email")
    .email("Please Enter Valid Email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .min(3, "Password 3 or more characters"),
});

const LoginPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const url = BASE_URL + "/login";
      const resp = await axios.post(url, data, headers);
      localStorage.setItem("token", JSON.stringify(resp.data));

      dispatch(updateToken(resp.data));

      getProfile(resp.data);
    } catch (error) {
      addToast(error.response.data.message, { appearance: "error" });
    }
  };

  async function getProfile(data) {
    try {
      headers["headers"]["Authorization"] = "Bearer " + data.access_token;
      const url = BASE_URL + "/profile";
      const resp = await axios.get(url, headers);
      localStorage.setItem("profile", JSON.stringify(resp.data.data.user));

      dispatch(updateProfile(resp.data.data.user));

      addToast("เข้าสู่ระบบเรียบร้อย", { appearance: "success" });
      history.replace("/");
    } catch (error) {
      addToast(error.response.data.message, { appearance: "error" });
    }
  }

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col md={6}>
            <h3>Login</h3>

            <Form onSubmit={handleSubmit(onSubmit)}>
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
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
