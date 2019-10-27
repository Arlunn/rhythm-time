import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="timer-container interface">
        <h2
          className={this.getTimerClasses()}
          style={{ animation: this.animation }}
        ></h2>
      </div>
    );
  }

  getTimerClasses() {
    let classes = "timer";
    classes += this.props.active ? " active" : "";

    return classes;
  }
}

export default Timer;
