import React, { Component } from "react";

class Tempo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h1 className="play" onClick={this.props.beginTempo}>
          Play
        </h1>
      </>
    );
  }
}

export default Tempo;
