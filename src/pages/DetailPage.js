import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Spinner, Alert, CardDeck, Card, Button } from "react-bootstrap";
import { BASE_URL } from "../constants";
import { useParams, useHistory } from "react-router";

function DetailPage() {
  const { id, title } = useParams();
  const history = useHistory();

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    _getData(id);

    return () => {
      cancelToken.current.cancel();
    };
  }, [id]);

  async function _getData(pid) {
    try {
      const resp = await axios.get(BASE_URL + "/course/" + pid, {
        cancelToken: cancelToken.current.token,
      });

      if (resp.data.status === "success" && resp.data.status_code === 200) {
        setDetail(resp.data.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
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

  function renderItem(d) {
    return (
      <div className="col-md-4" key={`detail-${d.ch_id}`}>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>{d.ch_title}</Card.Title>
            <Card.Text>{d.ch_dateadd}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <Button
            variant="secondary"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </Button>

          <h2>
            {title} - {id}
          </h2>
          <div className="row">
            {detail.length > 0 ? (
              <CardDeck>{detail.map(renderItem)}</CardDeck>
            ) : (
              <div className="col-md-12">
                <div className="text-center">
                  <Alert variant="danger">Product not found!</Alert>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
