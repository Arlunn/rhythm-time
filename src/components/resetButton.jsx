import React, { Component } from "react";

class ResetButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="reset-container interface">
        <a href="#" className="reset" onClick={this.props.resetGame}></a>
      </div>
    );
  }
}

export default ResetButton;
