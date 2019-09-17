import React, { Component } from "react";

class Points extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="points-container interface">
        <h2 className="points interface">{this.props.points}</h2>
      </div>
    );
  }
}

export default Points;
