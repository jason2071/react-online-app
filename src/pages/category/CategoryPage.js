import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Spinner, Alert, Table } from "react-bootstrap";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import { BASE_URL } from "../../constants";

function CategoryPage() {
  let history = useHistory();

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    _getData();

    return () => {
      cancelToken.current.cancel();
    };
  }, []);

  async function _getData() {
    try {
      const url = BASE_URL + `/category`;
      const resp = await axios.get(url, {
        cancelToken: cancelToken.current.token,
      });

      setCategory(resp.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function _delete(id) {
    try {
      const url = BASE_URL + `/category/${id}`;
      const resp = await axios.delete(url, {
        cancelToken: cancelToken.current.token,
      });

      alert(resp.data.message);
      history.go(0);
    } catch (error) {
      setError(error);
    } finally {
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <Alert variant="danger">
            An error occurred, please ask the server, try again. <br />
            {error.response.data.message}
          </Alert>
        </div>
      </div>
    );
  }

  function renderItem(c) {
    return (
      <tr key={`category-${c.id}`}>
        <th scope="row">{c.id}</th>
        <td>{c.name}</td>
        <td>
          <Button
            className="ml-2"
            variant="outline-info"
            size="sm"
            onClick={() => history.push(`/category/edit/${c.id}`)}
          >
            <BsPencilSquare />
          </Button>
          <Button
            className="ml-2"
            variant="outline-danger"
            size="sm"
            onClick={() => {
              const isConfirm = window.confirm("Do you wan delete " + c.name);
              if (isConfirm) _delete(c.id);
            }}
          >
            <BsTrashFill />
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md">
            <Button
              className="mb-3"
              variant="success"
              onClick={() => history.push("/category/create")}
            >
              Add
            </Button>

            <h3>Categories</h3>

            <Table bordered striped hover size="sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Tools</th>
                </tr>
              </thead>
              <tbody>{category.map(renderItem)}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
