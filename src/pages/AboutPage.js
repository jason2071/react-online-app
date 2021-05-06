import axios from "axios";
import React, { useState, useEffect } from "react";

import { BASE_URL } from "../constants";

function AboutPage() {
  const [version, setVersion] = useState("0.0.1");

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    try {
      const url = BASE_URL + "/version";
      const resp = await axios.get(url);

      if (resp.data.message === "success" && resp.data.status_code === 200) {
        setVersion(resp.data.data.version);
      }
    } catch (error) {}
  }

  return (
    <div className="container">
      <div className="row  mt-4">
        <div className="col-md">
          <h2>About</h2>
          <p>Backend API version : {version}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
