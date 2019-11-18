import React, { Component } from "react";
import b1 from "../assets/b1.png";

class Note extends Component {
  /*
  state = {
    hit: false,
    value: this.props.value,
    src: this.props.src
  };*/
  render() {
    return (
      <li
        className={this.getNoteClasses()}
        value={this.props.note.value}
        hit={this.props.note.hit}
        id={this.props.note.id}
      >
        <img
          className="note-img"
          src={require("../assets/" + this.props.src)}
        />
      </li>
    );
  }

  getNoteClasses() {
    let classes = this.props.note.type === "rest" ? "rest" : "note";
    classes +=
      this.props.note.hit === "true" && this.props.note.id != "rest"
        ? " animate"
        : "";
    classes += this.props.note.value == 0.25 ? " quarter" : " eight";

    return classes;
  }
}

export default Note;
