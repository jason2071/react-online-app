import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useHistory, useParams } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Please choose a name."),
});

function EditPage() {
  const history = useHistory();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getData = useCallback(async () => {
    try {
      const url = BASE_URL + "/category/" + id;
      const resp = await axios.get(url);
      setValue("name", resp.data.name);
    } catch (error) {}
  }, [id, setValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onSubmit = async (data) => {
    try {
      const url = BASE_URL + "/category";
      const resp = await axios.put(url, {
        id: id,
        name: data.name,
      });
      alert(resp.data.message);
      history.replace("/category");
    } catch (error) {}
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

export default EditPage;
