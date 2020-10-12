import React, { Component } from "react";

class Timer extends Component {
  render() {
    return (
      <div className="timer-container interface">
        <div
          className={this.getTimerClasses()}
          style={{ animation: this.animation }}
        ></div>
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
