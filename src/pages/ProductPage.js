import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Table, Badge, Image, Spinner, Alert } from "react-bootstrap";
import { BsEyeFill, BsFillBucketFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";

import { updateCart } from "../redux/actions/cart.action";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cartReducer);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    _getData();

    return () => {
      cancelToken.current.cancel();
    };
  }, []);

  async function _getData() {
    try {
      const resp = await axios.get(BASE_URL + "/course", {
        cancelToken: cancelToken.current.token,
      });

      if (
        resp.data.meta.status === "success" &&
        resp.data.meta.status_code === 200
      ) {
        setProducts(resp.data.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function _updateCart(p) {
    const product = {
      id: p.id,
      name: p.title,
      price: p.view,
      qty: 1,
    };

    dispatch(updateCart({ product, cart: cartRedux.cart }));
  }

  function _renderItem(product) {
    return (
      <tr key={`product-${product.id}`}>
        <th scope="row">{product.id}</th>
        <td>{product.title}</td>
        <td>{product.detail}</td>
        <td>{format(new Date(product.date), "dd MMM yyyy", { locale: th })}</td>
        <td>
          <Badge variant="success">{product.view}</Badge>
        </td>

        <td>
          <Image
            src={product.picture}
            thumbnail
            alt={product.title}
            width={100}
          />
        </td>
        <td>
          <Link to={`/detail/${product.id}/title/${product.title}`}>
            <BsEyeFill />
          </Link>
          <button
            className="btn btn-outline-success ml-2"
            onClick={() => _updateCart(product)}
          >
            <BsFillBucketFill />
          </button>
        </td>
      </tr>
    );
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

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md">
          <h3>Products</h3>
          <Table bordered striped hover>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Detail</th>
                <th scope="col">Date</th>
                <th scope="col">View</th>
                <th scope="col">Picture</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>{products.map((product) => _renderItem(product))}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
