import React, { Component } from "react";

class Tempo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer">
        <a
          href="#"
          className={this.getTempoClasses()}
          onClick={this.props.beginTempo}
        ></a>
      </div>
    );
  }

  getTempoClasses() {
    let classes = "play";
    classes += this.props.active ? " active" : "";

    return classes;
  }
}

export default Tempo;
