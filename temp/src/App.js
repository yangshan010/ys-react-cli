import React, { Component } from "react";
import PageA from "./view/PageA";
import PageB from "./view/PageB";
import PageC from "./view/PageC";
export default class App extends Component {
  render() {
    return (
      <div>
        <PageA />
        <PageB />
      </div>
    );
  }
}
