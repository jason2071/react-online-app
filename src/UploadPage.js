import React from "react";
import axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "./constants";

const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/jpg"];

const UploadPage = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const fileUpload = data.picture[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileUpload);
    reader.onload = (e) => {
      const base64Image = e.target.result;
      uploadImage(base64Image);
    };
  };

  async function uploadImage(base64Image) {
    try {
      const url = BASE_URL + "/upload";
      const resp = await axios.post(url, {
        picture: base64Image,
      });
      // TODO: Upload success
      //   console.log(resp);
      alert(resp.data.data.message);
      history.replace("/");
    } catch (error) {}
  }

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col md={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">
                  Example file input
                </label>
                <input
                  type="file"
                  className={`form-control-file ${
                    errors.picture ? "is-invalid" : ""
                  }`}
                  id="exampleFormControlFile1"
                  accept="image/jpeg"
                  {...register("picture", {
                    required: "Please input picture",
                    validate: {
                      checkFileType: (value) => {
                        return (
                          value &&
                          SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
                        );
                      },
                    },
                  })}
                />
                {errors.picture && errors.picture.type === "required" && (
                  <div className="invalid-feedback">
                    {errors.picture.message}
                  </div>
                )}

                {errors.picture && errors.picture.type === "checkFileType" && (
                  <div className="invalid-feedback">
                    Image files only support image/jpg and image/jpeg
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UploadPage;
