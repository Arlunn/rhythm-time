import React, { Component } from "react";

class PlayButton extends Component {
  render() {
    return (
      <div className="play-container interface">
        <img
          href="#"
          className={this.getPlayClasses()}
          onClick={this.props.beginTempo}
          src={require("../assets/" + this.getSrc())}
          alt="Play"
        ></img>
      </div>
    );
  }

  getPlayClasses() {
    let classes = "play";
    classes += this.props.active ? " active" : "";

    return classes;
  }

  getSrc() {
    let src = this.props.active ? "play.svg" : "pause.svg";
    return src;
  }
}

export default PlayButton;
