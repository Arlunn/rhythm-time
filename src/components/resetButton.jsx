import React, { Component } from "react";

class ResetButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="reset-container interface">
        <img
          className="reset"
          onClick={this.props.resetGame}
          src={require("../assets/restart.svg")}
        ></img>
      </div>
    );
  }
}

export default ResetButton;
