import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../utils/number.helper";

function CartPage() {
  const [sumTotal, setSumTotal] = React.useState(0);
  const cartRedux = useSelector((state) => state.cartReducer).cart;

  const calculateTotal = (data) => {
    let total = 0;

    data.map((c) => {
      return (total += parseInt(c.price, 10) * c.qty);
    });

    setSumTotal(total);
  };

  React.useEffect(() => {
    calculateTotal(cartRedux);
  }, [cartRedux]);

  function renderItem(c, index) {
    return (
      <tr key={`cart-${c.id}`}>
        <th scope="row">{index + 1}</th>
        <td>{c.name}</td>
        <td>{numberWithCommas(c.price)}</td>
        <td>{c.qty}</td>
        <td>{numberWithCommas(c.price * c.qty)}</td>
      </tr>
    );
  }

  return (
    <div className="container">
      <div className="row  mt-4">
        <div className="col-md">
          <h2>Cart</h2>
          <Table bordered striped hover>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Result</th>
              </tr>
              {cartRedux.length > 0 && cartRedux.map(renderItem)}
              <tr>
                <th colSpan="4">Total</th>
                <td>{numberWithCommas(sumTotal)}</td>
              </tr>
            </thead>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
