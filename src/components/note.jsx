import React, { Component } from "react";

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
        onClick={() => this.props.onHit(this.props.note)}
        value={this.props.note.value}
        hit={this.props.note.hit}
      >
        <img className="note-img" src={this.props.src} />
      </li>
    );
  }

  getNoteClasses() {
    let classes = "note";
    classes += this.props.note.hit === "true" ? " animate" : "";
    classes += this.props.note.value == 0.25 ? " quarter" : " eight";

    return classes;
  }
}

export default Note;
