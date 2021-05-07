import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import axios, { CancelToken } from "axios";

import { BASE_URL } from "../constants";

function HomePage() {
  const { isLoading, error, data } = useQuery("getData", _getData);

  async function _getData() {
    const source = CancelToken.source();
    const resp = await axios.get(BASE_URL + "/news?page=1", {
      cancelToken: source.token,
    });
    resp.cancel = () => source.cancel();
    return resp;
  }

  if (isLoading) {
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

  function renderItem(n) {
    return (
      <div className="col-md-4" key={`news-${n.id}`}>
        <h2>{n.topic}</h2>
        <p>{n.detail}</p>
        <p>
          <Link to="/" className="btn btn-secondary" role="button">
            View details &raquo;
          </Link>
        </p>
      </div>
    );
  }

  return (
    <main role="main">
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Hello, world!</h1>
          <p>
            This is a template for a simple marketing or informational website.
            It includes a large callout called a jumbotron and three supporting
            pieces of content. Use it as a starting point to create something
            more unique.
          </p>

          <p>
            <Link
              to="/product"
              className="btn btn-primary btn-lg"
              href="#"
              role="button"
            >
              Products &raquo;
            </Link>
          </p>
        </div>
      </div>

      <div className="container">
        {/* {isFetching && "Loading..."} */}

        <div className="row">{data.data.data.map(renderItem)}</div>
        <hr />
      </div>
    </main>
  );
}

export default HomePage;
