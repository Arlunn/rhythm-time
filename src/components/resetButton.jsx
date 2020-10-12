import React, { Component } from "react";

class ResetButton extends Component {
  render() {
    return (
      <div className="reset-container interface">
        <img
          className="reset"
          onClick={this.props.resetGame}
          src={require("../assets/restart.svg")}
          alt="Reset"
        ></img>
      </div>
    );
  }
}

export default ResetButton;
