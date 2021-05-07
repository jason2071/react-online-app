import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL, headers } from "../../constants";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const schema = yup.object().shape({
  name: yup.string().required("Please choose a name."),
});

function CreatePage() {
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
      const url = BASE_URL + "/category";
      const resp = await axios.post(url, data, headers);
      addToast(resp.data.message, { appearance: "success" });
      history.replace("/category");
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md">
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

              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePage;
