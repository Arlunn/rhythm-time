import React, { Component } from "react";

class Streak extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.getStreakNumberClasses()}>
        <img
          className="streak-number"
          src={require("../assets/" + this.getSource() + ".svg")}
        ></img>
        <img
          className="streak-text"
          src={require("../assets/streak.svg")}
        ></img>
      </div>
    );
  }

  getStreakNumberClasses() {
    let classes = "streak-container interface";
    if (this.props.streak > 14) {
      classes += " streak-fifteen";
    } else if (this.props.streak > 9) {
      classes += " streak-ten";
    } else if (this.props.streak > 4) {
      classes += " streak-five";
    }

    return classes;
  }

  getSource() {
    let source = "5";
    if (this.props.streak > 13) {
      source = "15";
    } else if (this.props.streak > 8) {
      source = "10";
    }
    return source;
  }
}

export default Streak;
