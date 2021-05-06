import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Spinner, Alert, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { BASE_URL } from "../../constants";

const pageSize = 15;

function HospitalPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    _getData(page);

    return () => {
      cancelToken.current.cancel();
    };
  }, [page]);

  async function _getData(page) {
    try {
      const url = BASE_URL + `/hospital2?page=${page}&page_size=${pageSize}`;
      const resp = await axios.get(url, {
        cancelToken: cancelToken.current.token,
      });

      if (
        resp.data.meta.status === "success" &&
        resp.data.meta.status_code === 200
      ) {
        setHospitals(resp.data.data);
        setTotal(resp.data.meta.pagination.total);
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

  function renderItem(h) {
    return (
      <tr key={`hospital-${h.id}`}>
        <th scope="row">{h.id}</th>
        <td>{h.code}</td>
        <td>{h.h_name}</td>
      </tr>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md">
            <h3>Hospitals</h3>

            <Table bordered striped hover size="sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Code</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>{hospitals.map(renderItem)}</tbody>
            </Table>

            <Pagination
              activePage={page}
              itemsCountPerPage={pageSize}
              totalItemsCount={total}
              pageRangeDisplayed={10}
              onChange={(pageNumber) => setPage(pageNumber)}
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="Previous"
              nextPageText="Next"
              firstPageText="First"
              lastPageText="Last"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HospitalPage;
