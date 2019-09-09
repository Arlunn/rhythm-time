import React, { Component } from "react";
import Note from "./note";

class Measure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measure: this.props.notes
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ measure: this.props.notes });
  }

  render() {
    return (
      <div className="measure-wrapper">
        <ul className="measure">
          {this.state.measure.map(note => (
            <Note
              key={note.id}
              value={note.value}
              src={note.src}
              onHit={this.handleHit}
              hit={note.hit}
              note={note}
            />
          ))}
        </ul>
      </div>
    );
  }

  handleHit = note => {
    const measure = [...this.state.measure];
    const index = measure.indexOf(note);
    measure[index] = { ...note };
    measure[index].hit = "true";
    this.setState({ measure });
  };
}

export default Measure;
