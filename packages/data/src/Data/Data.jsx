// import './styles.css';

import React from "react";
import moment from "moment";

const data = [];

// Some logic to make the component heavier
for (let i = 0; i < 10000; i++) {
  data.push(moment());
}

const Data = () => data.map((d) => <div id={d.id}>{d.toString()}</div>);

export default Data;
