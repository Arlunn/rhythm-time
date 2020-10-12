import React, { Component } from "react";

class Instructions extends Component {
  render() {
    return (
      <div className="instructions interface">
        <p className={this.getPlayClasses()}>Tap or Press Space to the beat!</p>
      </div>
    );
  }

  getPlayClasses() {
    let classes = "instructions-text";
    classes += this.props.active ? " active" : "";
    classes += this.props.started ? " glow" : "";
    return classes;
  }
}

export default Instructions;
